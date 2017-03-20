import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    return (
      <View style={{padding: 30}}>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default ProfileScreen;