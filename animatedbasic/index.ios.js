import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
} from 'react-native';

export default class animatedbasic extends Component {
  componentWillMount() {
      this.animatedValue = new Animated.Value(0);
      this.rawValue = 0;
      this.animatedValue.addListener(value => {
        this.rawValue = value.value;
      });

      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (e, gestureState) => {
          this.animatedValue.setOffset(this.rawValue);
          this.animatedValue.setValue(0);
        },
        onPanResponderMove: Animated.event([
          null, { dy: this.animatedValue}
        ])
      })

      this.frontRotate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
        extrapolate: 'clamp'
      })
      this.backRotate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
        extrapolate: 'clamp'
      })
  }

  render() {
    return (
      <View style={styles.container}>
      <View {...this._panResponder.panHandlers}>
        <Animated.View style={[
          styles.flipCard,
          {transform: [
            {perspective: 850},
            {rotateX: this.frontRotate },
          ]}]}>
          <Text style={styles.flipText}>
            This text is flipping great.
          </Text>
        </Animated.View>
        <Animated.View style={[
          styles.flipCard,
          styles.flipCardBack,
          {
            position: "absolute",
            top: 0,
          },
          {transform: [
            {perspective: 850},
            {rotateX: this.backRotate },
          ]}]}>
          <Text style={styles.flipText}>
            This text is flipping on the back.
          </Text>
        </Animated.View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red"
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
