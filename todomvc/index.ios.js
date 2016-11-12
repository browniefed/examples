import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ListView,
  PixelRatio,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Row from "./row";

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "COMPLETED") return item.complete;
    if (filter === "ACTIVE") return !item.complete
  })
}

export default class todomvc extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      allComplete: false,
      value: "",
      filter: "ALL",
      data: [],
      dataSource: ds.cloneWithRows([]),
      complete: false,
    }

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
    this.handleFilterComplete = this.handleFilterComplete.bind(this);
  }
  
  componentWillMount() {
    AsyncStorage.getItem("items").then((items = "[]") => {
      const data = JSON.parse(items);
      this.setState({
        loading: false,
        data: data,
        dataSource: this.state.dataSource.cloneWithRows(data),
      })
    });
  }
  

  handleAddItem() {
    if (!this.state.value) return;

    const newData = [
      ...this.state.data,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false,
      }
    ];
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
      value: ''
    })
    AsyncStorage.setItem("items", JSON.stringify(newData));
  }
  
  handleRemoveItem(key) {
    const newData = this.state.data.filter((item) => {
      return item.key !== key;
    });
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
    })
  }

  handleToggleComplete(key, complete) {
    const newData = this.state.data.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    });
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
    })
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newData = this.state.data.map((item) => {
      return {
        ...item,
        complete,
      }
    });
    this.setState({
      allComplete: complete,
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
    })
  }

  handleFilterComplete() {
    const newData = filterItems("ACTIVE", this.state.data);
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
    })
  }

  handleFilter(filter) {
    this.setState({
      filter,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(filter, this.state.data)),
    })
  }

  handleUpdateText(key, value) {
    const newData = this.state.data.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        text: value
      }
    });
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
    })
  }

  handleToggleEdit(key, editing) {
    const newData = this.state.data.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        editing
      }
    });
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(filterItems(this.state.filter, newData)),
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.handleToggleAllComplete}>
            <Text style={styles.toggleIcon}>❯</Text>
          </TouchableOpacity>
          <TextInput
            value={this.state.value}
            placeholder="What needs to be done?"
            onChangeText={(value) => this.setState({ value })}
            style={styles.input}
            blurOnSubmit={false}
            returnKeyType="done"
            onSubmitEditing={this.handleAddItem}
          />
        </View>
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
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
        <View style={styles.footer}>
          <Text>{this.state.dataSource.getRowCount()} Count</Text>
          <View style={styles.filters}>
            <TouchableOpacity style={[styles.filter, this.state.filter === "ALL" && styles.selected]} onPress={() => this.handleFilter("ALL")}>
              <Text>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filter, this.state.filter === "ACTIVE" && styles.selected]} onPress={() => this.handleFilter("ACTIVE")}>
              <Text>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filter, this.state.filter === "COMPLETED" && styles.selected]} onPress={() => this.handleFilter("COMPLETED")}>
              <Text>Completed</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.handleFilterComplete}>
            <Text>Clear Completed</Text>
          </TouchableOpacity>
        </View>

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
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  toggleIcon: {
    transform: [{ rotate: "90deg" }],
    fontSize: 30,
    color: "#CCC",
  },
  toggleActive: {
    color: "#333"
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50,
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
  footer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filters: {
    flexDirection: "row",
    alignSelf: "center"
  },  
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent"
  },
  selected: {
    borderColor: "rgba(175, 47, 47, 0.2)"
  }
});

AppRegistry.registerComponent('todomvc', () => todomvc);
