import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

export default class general extends Component {
  constructor(props) {
    super(props);
    const { width, height} = Dimensions.get("window")
    this.state = {
      width,
      height
    }
  }
  onLayout() {
    const { width, height} = Dimensions.get("window")
    this.setState({
      width,
      height
    })
  }
  render() {
    return (
      <View style={styles.container} onLayout={() => this.onLayout()}>
        <Text>Width: {this.state.width}</Text>
        <Text>Height: {this.state.height}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('general', () => general);
