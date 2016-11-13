import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

import Footer from "./footer";
import Header from "./header";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}></View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: { paddingTop: 30 }
    }),
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1,
  },
});