import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";

import Video from "react-native-video";
import LightVideo from "./lights.mp4";

import Icon from "react-native-vector-icons/FontAwesome";

export default class rnvideo extends Component {
  state = {
    error: false,
  };
  handleError = meta => {
    const { error: { code } } = meta;

    let error = "An error has occurred playing this video";
    switch (code) {
      case -11800:
        error = "Could not load video from URL";
        break;
    }

    this.setState({
      error,
    });
  };
  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { error } = this.state;

    return (
      <View style={styles.container}>
        <View style={error ? styles.error : undefined}>
          <Video
            style={{ width: "100%", height }}
            source={{ uri: "http://google.com/notavideo" }}
            resizeMode="contain"
            onError={this.handleError}
          />
          <View style={styles.videoCover}>
            {error && <Icon name="exclamation-triangle" size={30} color="red" />}
            {error && <Text>{error}</Text>}
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
    backgroundColor: "rgba(255,255,255, .9)",
  },
  error: {
    backgroundColor: "#000",
  },
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
