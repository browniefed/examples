import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';

export default class realworld extends Component {
  constructor(props) {
    super(props);
    this.triggerAnimation = this.triggerAnimation.bind(this);
  }
  
  componentWillMount() {
    this.animation = new Animated.Value(0);
  }
  
  triggerAnimation() {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: 400,
      toValue: 3,
      ease: Easing.bounce
    }).start();
  }
  
  render() {
    const interpolated = this.animation.interpolate({
      inputRange: [0, .5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0]
    })
    const style = {
      transform: [
        { translateX: interpolated }
      ]
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.triggerAnimation}>
          <Animated.View style={[style, styles.button]}>
            <Text style={styles.text}>Press To Wiggle</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "#333"
  },
  text: {
    color: "#FFF"
  }
});

AppRegistry.registerComponent('realworld', () => realworld);
