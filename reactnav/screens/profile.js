import React, { Component } from "react";
import { Image, View, Text, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

class ProfileScreen extends Component {
  static navigationOptions = {
    drawer: {
      label: "Profile",
      icon: <Image source={require("../profile.png")} style={styles.icon} />,
    },
    title: "Profile",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button title="Go Home" onPress={() => this.props.navigation.navigate("HomeDrawer")} />
        <Button title="Go Change Password" onPress={() => this.props.navigation.navigate("ChangePassword")} />
        <Button title="Open Drawer" onPress={() => this.props.navigation.navigate("DrawerOpen")} />
        <Button title="Closer Drawer" onPress={() => this.props.navigation.navigate("DrawerClose")} />
      </View>
    );
  }
}

export default ProfileScreen;
