import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  TextInput,
  ScrollView
} from "react-native";

export default class realworld extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.modal]}
        >
          <View style={styles.comments}>
            <ScrollView>
              <Text style={styles.fakeText}>Top</Text>
              <View style={styles.fakeComments} />
              <Text style={styles.fakeText}>Bottom</Text>
            </ScrollView>
          </View>
          <View style={styles.inputWrap}>
            <TextInput style={styles.textInput} placeholder="Comment" />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  modal: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#333"
  },
  comments: {
    flex: 1
  },
  fakeText: {
    padding: 15,
    textAlign: "center"
  },
  fakeComments: {
    height: 1000,
    backgroundColor: "#f1f1f1"
  },
  inputWrap: {
    flexDirection: "row",
    paddingHorizontal: 15
  },
  textInput: {
    flex: 1,
    height: 50,
    borderTopWidth: 1,
    borderTopColor: "#000"
  }
});

AppRegistry.registerComponent("realworld", () => realworld);
