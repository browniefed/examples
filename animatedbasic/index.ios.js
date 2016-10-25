import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet } from 'react-native';

export default class animatedbasic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    backgroundColor: "#333",
    width: 100,
    height: 100
  }
})

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
