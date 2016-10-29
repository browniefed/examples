import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class animatedbasic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Text style={styles.text}>Press Me</Text>
        </View>
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
  button: {
    backgroundColor: "#333",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF"
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
