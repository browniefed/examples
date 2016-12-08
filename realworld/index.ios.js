import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get("window");

export default class realworld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
      value: "",
      text: "Thank you for being the best"
    }
    this.startAnimation = this.startAnimation.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }
  componentWillMount() {
    this.animated = new Animated.Value(0);
  }

  startAnimation() {
    this.setState({ pressed: true }, () => {
      Animated.timing(this.animated, {
        toValue: 1,
        duration: 600
      }).start();
    });
  }
  
  handleSend() {
    this.setState({
      text: this.state.value,
    }, () => {
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 300
      }).start(() => {
        this.setState({ pressed: false, value: "" })
      });
    });
  }
  
  render() {
    const inerpolated = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 60]
    });

    const plusInterpolate = this.animated.interpolate({
      inputRange: [0, .1],
      outputRange: [1, 0],
      extrapolate: "clamp"
    })

    const opacityInterpolate = this.animated.interpolate({
      inputRange: [0, .5, 1],
      outputRange: [0, .7, 1],
    })

    const expandStyle = {
      transform: [
        { scale: inerpolated }
      ]
    }
    const plusStyle = {
      transform: [
        { scale: plusInterpolate }
      ]
    }

    const inputDisplayStyle = {
      opacity: opacityInterpolate
    }

    const inputCard = (
      <Animated.View style={[StyleSheet.absoluteFill, styles.display, inputDisplayStyle]}>
        <View style={styles.card}>
          <Text style={[styles.quote, styles.quoteWhite, styles.quotePosition]}>“</Text>
          <TextInput 
            autoFocus 
            multiline
            value={this.state.value}
            onChangeText={(value) => this.setState({ value })}
            placeholder="Write Something Nice..."
            placeholderTextColor="#ffd1d2"
            style={[styles.cardText, styles.cardInput]}
          />
          <TouchableWithoutFeedback onPress={this.handleSend}>
            <View style={styles.sendButton}>
              <Text style={styles.sendText}>Send</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
    )

    return (
      <View style={styles.container}>
        <View style={styles.display}>
          <View style={styles.card}>
            <Text style={[styles.quote, styles.quotePosition]}>“</Text>
            <Text style={styles.cardText}>{this.state.text}</Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <View style={styles.position}>
            <Animated.View style={[styles.expand, expandStyle]} />
            <Animated.View style={[StyleSheet.absoluteFill, styles.plusWrap, styles.center, plusStyle]}>
              <Text style={styles.plus}>+</Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.pressed && inputCard}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width,
    height: height / 2,
    paddingTop: 45,
    paddingLeft: 40
  },
  cardInput: {
    width: width - 40,
    flex: 1,
    color: "#FFF"
  },
  cardText: {
    backgroundColor: "transparent",
    fontSize: 60,
    color: "#333",
    fontWeight: "bold"
  },
  quotePosition: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  quote: {
    backgroundColor: "transparent",
    fontSize: 150,
    color: "rgba(0,0,0, .1)",
    fontWeight: "bold"
  },
  quoteWhite: {
    color: "rgba(255,255,255,.1)"
  },
  position: {
    position: "absolute",
    left: 15,
    bottom: 15,
  },
  expand: {
    backgroundColor: "#FF595E",
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  plusWrap: {
    backgroundColor: "transparent",
  },
  plus: {
    color: "#FFF",
    fontSize: 30,
  },
  sendButton: {
    backgroundColor: "#FF595E",
    borderWidth: 3,
    borderColor: "#FFF",
    borderRadius: 15,
    width: 150,
    padding: 7,
  },
  sendText: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  }
});

AppRegistry.registerComponent('realworld', () => realworld);
