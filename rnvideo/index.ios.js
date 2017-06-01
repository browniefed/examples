import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, TextInput } from "react-native";

import Video from "react-native-video";
import LightVideo from "./lights.mp4";

export default class rnvideo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video repeat source={LightVideo} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <View>
          <Text style={styles.header}>Login</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
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
  header: {
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center"
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#FFF",
    marginVertical: 15,
    paddingLeft: 15
  }
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
