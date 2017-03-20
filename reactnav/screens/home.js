import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Info")}>
          <Text>Go To Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
          <Text>Go To Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title: "Home",
};

export default HomeScreen;
