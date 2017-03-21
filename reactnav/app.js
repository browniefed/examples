import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DrawerNavigator } from "react-navigation";

import Home from "./screens/home"
import Profile from "./screens/profile";

const MainNav = DrawerNavigator({
  Home: {
    screen: Home
  },
  Profile: {
    screen: Profile
  }
})

export default MainNav;