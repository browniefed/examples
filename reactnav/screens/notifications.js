import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class NotificationScreen extends Component {
  static navigationOptions = {
    title: "Notifications"
  };
  render() {
    return (
      <View style={{padding: 30}}>
        <Text>Notifications</Text>
      </View>
    );
  }
}

export default NotificationScreen;