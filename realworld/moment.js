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

  render() {
    const animatedStyle = {
      transform: [
        { translateX: this.props.translateX }
      ]
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
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <View style={[styles.textWrap]}>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
          </View>
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
})

export default Moment;