import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';

export default class animatedbasic extends Component {
  constructor(props) {
    super(props);

    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }
  
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  
  handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: .5
    }).start()
  }
  handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start()
  }
  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
        >
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.text}>Press Me</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
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
