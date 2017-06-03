import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated, Dimensions } from "react-native";

import Video from "react-native-video";
import LightVideo from "./lights.mp4";

import Icon from "react-native-vector-icons/FontAwesome";

export default class rnvideo extends Component {
  state = {
    buffering: true,
    animated: new Animated.Value(0),
  };

  handleLoadStart = () => {
    this.triggerBufferAnimation();
  };

  triggerBufferAnimation = () => {
    this.loopingAnimation && this.loopingAnimation.stopAnimation();
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350,
      })
    ).start();
  };

  handleBuffer = meta => {
    meta.isBuffering && this.triggerBufferAnimation()

    if (this.loopingAnimation && !meta.isBuffering) {
      this.loopingAnimation.stopAnimation();
    }

    this.setState({
      buffering: meta.isBuffering,
    });
  };
  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { buffering } = this.state;

    const interpolatedAnimation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const rotateStyle = {
      transform: [{ rotate: interpolatedAnimation }],
    };

    return (
      <View style={styles.container}>
        <View style={buffering ? styles.buffering : undefined}>
          <Video
            repeat
            style={{ width: "100%", height }}
            source={{
              uri: "https://player.vimeo.com/external/206340985.hd.mp4?s=0b055000e30067f11d3e2537bceb7157b47475bc&profile_id=119&oauth2_token_id=57447761",
            }}
            resizeMode="contain"
            onLoadStart={this.handleLoadStart}
            onBuffer={this.handleBuffer}
          />
          <View style={styles.videoCover}>
            {buffering &&
              <Animated.View style={rotateStyle}>
                <Icon name="circle-o-notch" size={30} color="white" />
              </Animated.View>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
  },
  videoCover: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  buffering: {
    backgroundColor: "#000",
  },
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
