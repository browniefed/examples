import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from 'react-native';

export default class animatedbasic extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = {x: 0, y: 0}
    this.animatedValue.addListener((value) => this._value = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y
        });
        this.animatedValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dx: this.animatedValue.x, dy: this.animatedValue.y},
      ]),
      onPanResponderRelease: (e, {vx, vy}) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          velocity: {x: vx, y: vy},
          deceleration: 0.997,
        }).start();
      }
    })
  }
  
  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    };

    return (
      <View style={styles.container}>
        <Animated.View 
          {...this.panResponder.panHandlers}
          style={[styles.box, animatedStyle]} 
        >
          <Text style={styles.text}>Drag Me</Text>
        </Animated.View>
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
    width: 150,
    height: 150,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 20,
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
