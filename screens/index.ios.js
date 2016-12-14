import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("./background.jpg");
const lockIcon = require("./lock.png");
const personIcon = require("./person.png");

export default class screens extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={styles.spacer} />
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput placeholder="Username" style={styles.input} />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput placeholder="Password" style={styles.input} secureTextEntry />
            </View>
            <View>
              <TouchableOpacity activeOpacity={.5}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    width,
    height,
  },
  wrapper: {
    paddingHorizontal: 30,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrap: {
    height: 40,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5784af",
  },
  icon: {
    height: 25,
    width: 25,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#5784af",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#FFF",
  },
  forgotPasswordText: {
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

AppRegistry.registerComponent('screens', () => screens);
