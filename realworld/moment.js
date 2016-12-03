import React, { Component } from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";

const {width, height} = Dimensions.get("window");

class Moment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Animated.Value(1),
      focused: false,
    }
    this.handlePress = this.handlePress.bind(this);
  }

  
  componentWillMount() {
    this.bgFadeInterpolate = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange: ["rgba(0,0,0,.3)", "rgba(0,0,0,0)"]
    })

    this.textFade = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange: [0, 1]
    })
    
    this.calloutTranslate = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange: [0, 150]
    });

  }
  
  
  handlePress() {
    if (this.state.focused) {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
      }).start(() => {
        this.props.onFocus(false)
        this.setState({ focused: false });
      })
      return;
    }
    this.props.onFocus(true);
    Animated.timing(this.state.scale, {
      toValue: .9,
      duration: 300
    }).start(() => {
      this.setState({ focused: true })
    })
  }

  render() {
    const animatedStyle = {
      transform: [
        { scale: this.state.scale },
        { translateX: this.props.translateX }
      ]
    }

    const bgFadeStyle = {
      backgroundColor: this.bgFadeInterpolate
    }

    const textFadeStyle = {
      opacity: this.textFade
    }

    const calloutSlideStyle = {
      transform: [{ translateY: this.calloutTranslate }]
    }

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.container}>
            <Animated.Image 
              source={this.props.image} 
              style={[styles.image, animatedStyle]} 
              resizeMode="cover"
            />
          </View>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={[StyleSheet.absoluteFill, styles.center, bgFadeStyle]}>
              <Animated.View style={[textFadeStyle, styles.textWrap]}>
                <Text style={styles.title}>Jason Brown</Text>
                <Text style={styles.subtitle}>@browniefed</Text>
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.callout, calloutSlideStyle]}>
            <View>
              <Text style={styles.title}>Jason Brown</Text>
              <Text style={styles.subtitle}>@browniefed</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: width,
    height: height,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  center: {
    justifyContent: "center",
  },
  textWrap: {
    backgroundColor: "rgba(0,0,0,.5)",
    paddingVertical: 10,
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 30,
    color: '#FFF',
    textAlign: "center"
  },
  subtitle: {
    backgroundColor: "transparent",
    fontSize: 18,
    color: '#FFF',
    textAlign: "center"
  },
  callout: {
    height: 150,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  }
})

export default Moment;