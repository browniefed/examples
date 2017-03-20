import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    return (
      <View style={{padding: 30}}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default HomeScreen;