import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ScrollView,
} from "react-native";

import Egghead from "./egghead.png";

export default class realworld extends Component {
  componentWillMount() {
    this.animated = new Animated.Value(0);
  }

  render() {
    const hideImageInterpolate = this.animated.interpolate({
      inputRange: [0, 250],
      outputRange: [50, 0],
      extrapolate: "clamp",
    })

    const fontInterpolate = this.animated.interpolate({
      inputRange: [0, 250],
      outputRange: [24, 30],
    })

    const opacityInterpolate = this.animated.interpolate({
      inputRange: [0, 250],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const collapseInterpolate = this.animated.interpolate({
      inputRange: [0, 250],
      outputRange: [50, 0],
      extrapolate: "clamp"
    })

    const imageStyle = {
      width: hideImageInterpolate,
      height: hideImageInterpolate
    }

    const titleStyle = {
      fontSize: fontInterpolate
    }

    const fadeButtonStyle = {
      opacity: opacityInterpolate,
      height: collapseInterpolate
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.Image source={Egghead} style={[styles.image, imageStyle]} />
          <Animated.Text style={[styles.titleStyle, titleStyle]}>Egghead</Animated.Text>
          <Animated.View style={[styles.buttons, fadeButtonStyle]}>
            <View style={styles.button}>
              <Text>Button 1</Text>
            </View>
            <View style={styles.button}>
              <Text>Button 2</Text>
            </View>
          </Animated.View>
        </View>
        <View style={styles.scrollView}>
          <ScrollView 
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.animated }}}
            ])}
          >
            <View style={styles.fakeContent}>
              <Text style={styles.fakeText}>Top</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    marginBottom: 10,
  },
  fakeContent: {
    height: 1000,
    backgroundColor: "#4A89DC"
  },
  fakeText: {
    padding: 15,
    textAlign: "center",
    color: "#FFF",
  },
  buttons: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    paddingTop: 30,
    alignItems: "center"
  },
  scrollView: {
    flex: 1
  }
});

AppRegistry.registerComponent("realworld", () => realworld);
