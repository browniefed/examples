import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";

class ProfileScreens extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  render() {
    return (
      <View>
        <Text>Profile</Text>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ProfileScreens;