import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { StackNavigator } from "react-navigation";


class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
          <Text>Go To Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const NavStack = StackNavigator({
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
}, {
  transitionConfig: (nav) => {
    return {
      transitionSpec: {
        // friction: 2,
        // tension: 140,
        duration: 500,
        easing: Easing.bounce,
        timing: Animated.timing,
      },
    }
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent('navigation', () => NavStack);
