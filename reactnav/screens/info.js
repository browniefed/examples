import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class InfoScreen extends Component {
  static navigationOptions = {
    title: "Info"
  }
  render() {
    return (
      <View>
        <Text>Information</Text>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



export default InfoScreen;