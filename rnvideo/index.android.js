import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

import Video from "react-native-video";
import LightVideo from "./lights.mp4";
//https://player.vimeo.com/external/207277102.hd.mp4?s=6939b93ae3554679b57f5e7fa831eef712a74b3c&profile_id=119&oauth2_token_id=57447761
export default class rnvideo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={LightVideo}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
