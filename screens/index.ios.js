import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("./background.jpg");

export default class screens extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.background} resizeMode="cover">
          <View style={styles.spacer} />
          <View style={styles.wrapper}>
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
          </View>
          <View style={styles.spacer}/>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  background: {
    width: null,
    height: null,
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 50
  }
});

AppRegistry.registerComponent('screens', () => screens);
