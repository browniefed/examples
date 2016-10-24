import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, Animated } from 'react-native';

export default class animatedbasic extends Component {
  
  componentWillMount() {
    this.animatedOpacityValue = new Animated.Value(1)
  }
  componentDidMount() {
    Animated.timing(this.animatedOpacityValue, {
      toValue: .3,
      duration: 1000
    }).start()
  }
  
  
  render() {
    const style = { opacity: this.animatedOpacityValue }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.animated, style]}/>
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
  animated: {
    backgroundColor: "#333",
    width: 100,
    height: 100
  }
})

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
