import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated
} from "react-native";

const { width, height } = Dimensions.get("window");
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
export default class realworld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hearts: []
    };

    this.handleAddHeart = this.handleAddHeart.bind(this);
  }
  handleAddHeart() {
    const animation = new Animated.Value(0);
    this.setState(
      state => ({
        hearts: [...state.hearts, {animation, start: getRandomInt(100, width - 100)}]
      }),
      () => {
        Animated
          .timing(animation, {
            toValue: height,
            duration: 3000
          })
          .start();
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleAddHeart}>
          <View style={StyleSheet.absoluteFill}>
            {this.state.hearts.map(({animation, start }, index) => {
              const dividedHeight = height / 6;

              const positionInterpolate = animation.interpolate({
                inputRange: [0, height],
                outputRange: [height - 50, 0]
              });

              const opacityInterpolate = animation.interpolate({
                inputRange: [0, height - 200],
                outputRange: [1, 0]
              });

              const scaleInterpolate = animation.interpolate({
                inputRange: [0, 15, 30],
                outputRange: [0, 1.2, 1],
                extrapolate: "clamp"
              });

              const wobbleInterpolate = animation.interpolate({
                inputRange: [
                  0,
                  dividedHeight * 1,
                  dividedHeight * 2,
                  dividedHeight * 3,
                  dividedHeight * 4,
                  dividedHeight * 5,
                  dividedHeight * 6,
                ],
                outputRange: [
                  0,
                  15,
                  -15,
                  15,
                  -15,
                  15,
                  -15,
                ],
                extrapolate: "clamp"
              });

              const heartStyle = {
                left: start,
                transform: [
                  { translateY: positionInterpolate },
                  { translateX: wobbleInterpolate },
                  { scale: scaleInterpolate }
                ],
                opacity: opacityInterpolate
              };

              return <Heart key={index} style={heartStyle} />;
            })}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const Heart = ({ style }) => (
  <Animated.View style={[styles.heart, style]}>
    <View style={[styles.heartShape, styles.leftHeart]} />
    <View style={[styles.heartShape, styles.rightHeart]} />
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heart: {
    width: 50,
    height: 50,
    position: "absolute"
  },
  heartShape: {
    width: 30,
    height: 45,
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#6427d1"
  },
  leftHeart: {
    transform: [{ rotate: "-45deg" }],
    left: 5
  },
  rightHeart: {
    transform: [{ rotate: "45deg" }],
    right: 5
  }
});

AppRegistry.registerComponent("realworld", () => realworld);
