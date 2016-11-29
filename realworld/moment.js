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
      focused: false,
    }
    this.handlePress = this.handlePress.bind(this);
  }
  componentWillMount() {
    this.scale = new Animated.Value(1);
  }

  handlePress() {
    if (this.state.focused) {
      Animated.timing(this.scale, {
        toValue: 1,
        duration: 300,
      }).start(() => {
        this.props.onFocus(false)
        this.setState({ focused: false });
      })
      return;
    }
    this.props.onFocus(true);
    Animated.timing(this.scale, {
      toValue: .9,
      duration: 300
    }).start(() => {
      this.setState({ focused: true })
    })
  }
  render() {
    const animatedStyle = {
      transform: [
        {scale: this.scale },
        {translateX: this.props.animatedTranslate }
      ]
    }

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <Animated.Image 
            source={this.props.image} 
            style={[styles.image, animatedStyle]} 
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    overflow: "hidden",
  },
  image: {
    width: width,
    height: height,
  }
})

export default Moment;