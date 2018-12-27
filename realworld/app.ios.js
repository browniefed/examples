import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

export default class realworld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animate: new Animated.Value(0),
      success: false,
    }

    this.handlePress = this.handlePress.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handlePress() {
    Animated.timing(this.state.animate, {
      toValue: 1,
      duration: 300
    }).start()
  }

  handleSend() {
    this.setState({
      success: true,
    }, () => {
      Animated.sequence([
        Animated.timing(this.state.animate, {
        toValue: 0,
        duration: 300
      }),
      Animated.delay(1500)
      ]).start(() => this.setState({ success: false}))
    })
  }

  render() {
    const widthInterpolate = this.state.animate.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [150, 150, 300],
      extrapolate: "clamp"
    });
    const notifyTextScaleInterpolate = this.state.animate.interpolate({
      inputRange: [0, .5],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })

    const inputScaleInterpolate = this.state.animate.interpolate({
      inputRange: [0, .5, .6],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    })

    const sendButtonInterpolate = this.state.animate.interpolate({
      inputRange: [0, .6, 1],
      outputRange: [0, 0, 1]
    })

    const thankyouScaleInterpolate = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    const buttonWrapStyle = {
      width: widthInterpolate,
    }

    const notifyTextStyle = {
      transform: [{
        scale: notifyTextScaleInterpolate
      }]
    }

    const thankyouTextStyle = {
      transform: [{
        scale: thankyouScaleInterpolate,
      }]
    }

    const inputWrapStyle = {
      transform: [{
        scale: inputScaleInterpolate
      }]
    }

    const sendButtonStyle = {
      transform: [{
        scale: sendButtonInterpolate
      }]
    }
    const { success } = this.state;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Animated.View style={[styles.buttonWrap, buttonWrapStyle]}>

            {!success && <Animated.View style={[StyleSheet.absoluteFill, styles.inputWrap, inputWrapStyle]}>
              <TextInput 
                autoFocus
                keyboardType="email-address"
                placeholder="Email" 
                placeholderTextColor="rgba(255,123,115, 0.8)" 
                style={styles.textInput}
              />
              <TouchableOpacity style={[styles.sendButton, sendButtonStyle]} onPress={this.handleSend}>
                <Text style={styles.sendText}>Send</Text>              
              </TouchableOpacity>
            </Animated.View>
            }

            {!success && <Animated.View style={notifyTextStyle}>
              <Text style={styles.notifyText}>Notify Me</Text>
            </Animated.View>
            }
            {success && <Animated.View style={thankyouTextStyle}>
              <Text style={styles.notifyText}>Thank You</Text>
            </Animated.View>
            }
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
    justifyContent: "center",
    backgroundColor: "#FF7B73"
  },
  buttonWrap: {
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  notifyText: {
    color: "#FF7B73",
    fontWeight: "bold"
  },
  inputWrap: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 4,
  },
  sendButton: {
    backgroundColor: "#FF7B73",
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  sendText: {
    color: "#FFF"
  }
});

AppRegistry.registerComponent('realworld', () => realworld);
console.disableYellowBox = true;