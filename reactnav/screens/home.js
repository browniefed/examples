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

class HomeScreen extends Component {
  static navigationOptions = {
    drawer: {
      label: "Home",
      icon: <Image source={require("../home.png")} style={styles.icon} />,
    },
    title: "Home",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button title="Go to Profile" onPress={() => this.props.navigation.navigate("ProfileDrawer")} />
        <Button title="Go to Notifications" onPress={() => this.props.navigation.navigate("Notifications")} />
        <Button title="Open Drawer" onPress={() => this.props.navigation.navigate("DrawerOpen")} />
        <Button title="Closer Drawer" onPress={() => this.props.navigation.navigate("DrawerClose")} />
      </View>
    );
  }
}

export default HomeScreen;
