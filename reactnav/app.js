import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { TabNavigator } from "react-navigation";

import Home from "./screens/home";
import Notifications from "./screens/notifications";
import Profile from "./screens/profile";

const MainNav = TabNavigator({
  Home: {
    screen: Home
  },
  Notifications: {
    screen: Notifications
  },
  Profile: {
    screen: Profile
  }
}, {
  swipeEnabled: true,
  animationEnabled: true
})

export default MainNav;