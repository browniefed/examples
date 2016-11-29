import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView
} from 'react-native';

import Moment from "./moment";

const { width } = Dimensions.get("window");
const DrinkImage1 = require("./images/drink1.jpg");
const DrinkImage2 = require("./images/drink2.jpg");
const DrinkImage3 = require("./images/drink3.jpg");

export default class realworld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollable: true,
    }
    this.handleFocus = this.handleFocus.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  componentWillMount() {
    this.animatedImage = new Animated.Value(0);
  }
  
  handleFocus(focused) {
    this.setState({
      scrollable: !focused
    })
  }
  handleScroll(e) {
    const { contentSize, contentOffset } = e.nativeEvent;
    this.animatedImage.setValue(contentOffset.x);
    // if contentOffset.x and
    // if contentSize.width
  }
  render() {
    // const animatedTranslate = this.animatedImage.interpolate({
    //   inputRange: [0, width - 1, width, (width * 2) - 1, width * 2, (width * 3) - 1, width * 3],
    //   outputRange: [0, -100, 0, -100, 0, -100, 0]
    // });
    const animatedTranslate = this.animatedImage.interpolate({
        inputRange: [0, 0, width + 1],
        outputRange: [0, 0, 100]
      });

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled={this.state.scrollable}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
          <Moment 
            image={DrinkImage1} 
            onFocus={this.handleFocus}
            animatedTranslate={animatedTranslate}
          />
          <Moment 
            image={DrinkImage2} 
            onFocus={this.handleFocus}
            animatedTranslate={animatedTranslate}
          />
          <Moment 
            image={DrinkImage3} 
            onFocus={this.handleFocus}
            animatedTranslate={animatedTranslate}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('realworld', () => realworld);
