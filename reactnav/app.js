import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator } from "react-navigation";
import Home from "./screens/home";
import Info from "./screens/info";
import Profile from "./screens/profile";

const MainStack = StackNavigator({
  Home: {
    screen: Home
  },
  Info: {
    screen: Info
  },
  Profile: {
    screen: Profile
  }
})

export default MainStack;