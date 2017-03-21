import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DrawerNavigator, StackNavigator } from "react-navigation";

import Home from "./screens/home"
import Profile from "./screens/profile";
import ChangePassword from "./screens/changepassword";
import Notifications from "./screens/notifications";

const HomeStack = StackNavigator({
  Home: {
    screen: Home
  },
  Notifications: {
    screen: Notifications
  }
})

const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile
  },
  ChangePassword: {
    screen: ChangePassword
  }
})
const MainNav = DrawerNavigator({
  HomeDrawer: {
    screen: HomeStack
  },
  ProfileDrawer: {
    screen: ProfileStack
  }
})

export default MainNav;