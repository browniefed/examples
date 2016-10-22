import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

export default class general extends Component {
  render() {
    return (
      <Image source={require("./cat.jpg")} style={styles.container}>
        <Text>A good looking cat</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: "center",
    justifyContent: "center"
  }
})

AppRegistry.registerComponent('general', () => general);
