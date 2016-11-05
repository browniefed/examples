import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#333"
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
