import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ListView,
  PixelRatio,
  AsyncStorage,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import Row from "./row";
import Footer from "./footer";
import Header from "./header";

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete
  })
}

export default class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      allComplete: false,
      value: "",
      filter: "ALL",
      items: [],
      dataSource: ds.cloneWithRows([]),
    }

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleFilterComplete = this.handleFilterComplete.bind(this);
  }
  
  componentWillMount() {
    AsyncStorage.getItem("items").then((json) => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false })
      } catch (e) {
        this.setState({ loading: false })
      }
    });
  }

  setSource(items, sourceData, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(sourceData),
      ...otherState
    })
    AsyncStorage.setItem("items", JSON.stringify(items));
  }
  

  handleAddItem() {
    if (!this.state.value) return;

    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
        editing: false,
      }
    ];
    this.setSource(newItems, filterItems(this.state.filter, newItems), { value: '' })
  }
  
  handleRemoveItem(key) {
    const newItems = this.state.items.filter((item) => {
      return item.key !== key;
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    });

    this.setSource(newItems, filterItems(this.state.filter, newItems));
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete,
    }));

    this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete : complete});
  }

  handleFilterComplete() {
    const newItems = filterItems("ACTIVE", this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems))
  }

  handleFilter(filter) {
    this.setSource(this.state.items, filterItems(filter, this.state.items), { filter })
  }

  handleUpdateText(key, value) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text: value
      }
    });
    this.setSource(newItems, newItems)
  }

  handleToggleEdit(key, editing) {
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing
      }
    });
    this.setSource(newItems, newItems)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onChange={(value) => this.setState({ value })}
          onAddItem={this.handleAddItem}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ...value}) => {
              return (
                <Row 
                  key={key}
                  {...value} 
                  onRemove={() => this.handleRemoveItem(key)} 
                  onComplete={(complete) => this.handleToggleComplete(key, complete)}
                  onUpdate={(value) => this.handleUpdateText(key, value)}
                  onToggleEdit={(value) => this.handleToggleEdit(key, value)}
                />
              )
            }}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
          />
        </View>
        <Footer
          count={filterItems("ACTIVE", this.state.items).length}
          handleFilter={this.handleFilter}
          handleFilterComplete={this.handleFilterComplete}
          filter={this.state.filter}
        />

        {this.state.loading && <View style={styles.loading}>
          <ActivityIndicator size="large" animating />
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#f5f5f5"
  },
  loading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.2)",
  },
  content: {
    flex: 1,
  },
  list: {
    backgroundColor: "#FFF",
  },
  separator: {
    borderWidth: 1 / PixelRatio.get(),
    borderColor: "#F5F5F5"
  },
});