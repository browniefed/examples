import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

export default class animatedbasic extends Component {
  
  componentWillMount() {
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(1);
  }
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.animatedValue1, {
        toValue: 500,
        duration: 300
      }),
      Animated.spring(this.animatedValue2, {
        toValue: 3,
      })
    ]).start();
  }
  
  
  render() {
    const animateStyles = {
      transform: [
        { translateY: this.animatedValue1},
        { scale: this.animatedValue2}
      ]
    }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animateStyles]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#333',
    width: 100,
    height: 100,
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
