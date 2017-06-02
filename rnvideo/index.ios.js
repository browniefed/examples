import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

import Video from "react-native-video";
import LightVideo from "./lights.mp4";

const THRESHOLD = 100;
export default class rnvideo extends Component {
  state = {
    paused: true,
  };
  position = {
    start: null,
    end: null,
  };
  handleVideoLayout = e => {
    const { height } = Dimensions.get("window");

    this.position.start = e.nativeEvent.layout.y - height + THRESHOLD;
    this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD;
  };

  handleScroll = e => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const paused = this.state.paused;
    const { start, end } = this.position;

    if (scrollPosition > start && scrollPosition < end && paused) {
      this.setState({ paused: false });
    } else if (
      (scrollPosition > end || scrollPosition < start) && !paused
    ) {
      this.setState({ paused: true });
    }
  };
  render() {
    const { width } = Dimensions.get("window");

    return (
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={16} onScroll={this.handleScroll}>
          <View style={styles.fakeContent}>
            <Text>
              {this.state.paused ? "Paused" : "Playing"}
            </Text>
          </View>
          <Video
            repeat
            source={LightVideo}
            paused={this.state.paused}
            onLayout={this.handleVideoLayout}
            style={{ width, height: 300 }}
          />
          <View style={styles.fakeContent}>
            <Text>
              {this.state.paused ? "Paused" : "Playing"}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fakeContent: {
    height: 850,
    backgroundColor: "#CCC",
    paddingTop: 250,
    alignItems: "center",
  },
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
