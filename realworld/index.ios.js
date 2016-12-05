import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';

import Heart from "./heart"

export default class realworld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      scale: new Animated.Value(0),
      opacityAnimations: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
      ]
    }
    this.triggerLike = this.triggerLike.bind(this);
  }
  triggerLike() {
    this.setState({
      liked: !this.state.liked
    })
    const showOpacityAnimations = this.state.opacityAnimations.map((animation) => {
      return Animated.spring(animation, {
        toValue: 1,
        friction: 2
      })
    })
    const hideOpacityAnimations = this.state.opacityAnimations.map((animation) => {
      return Animated.timing(animation, {
        toValue: 0,
        duration: 10
      })
    }).reverse();
    
    Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 2,
        friction: 3,
      }),
      Animated.sequence([
        Animated.stagger(50, showOpacityAnimations),
        Animated.delay(100),
        Animated.stagger(50, hideOpacityAnimations),
      ])
    ]).start();
  }
  render() {
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, .8, 1]
    })
    const heartButtonStyle = {
      transform: [{ scale: bouncyHeart }]
    }

    const opacityAnimationStyles = this.state.opacityAnimations.map((animation) => ({
      opacity: animation
    }))

    return (
      <View style={styles.container}>
        <View>
          <Heart filled style={[styles.explodeHeart, styles.position6, opacityAnimationStyles[5] ]} />
          <Heart filled style={[styles.explodeHeart, styles.position5, opacityAnimationStyles[4] ]} />
          <Heart filled style={[styles.explodeHeart, styles.position4, opacityAnimationStyles[3] ]} />
          <Heart filled style={[styles.explodeHeart, styles.position3, opacityAnimationStyles[2] ]} />
          <Heart filled style={[styles.explodeHeart, styles.position2, opacityAnimationStyles[1] ]} />
          <Heart filled style={[styles.explodeHeart, styles.position1, opacityAnimationStyles[0] ]} />
          <TouchableWithoutFeedback onPress={this.triggerLike}>
            <Animated.View style={heartButtonStyle}>
              <Heart filled={this.state.liked} />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
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
  explodeHeart: {
    left: 0, 
    top: 0,
    position: "absolute",
  },
  position1: {
    transform: [
      { scale: .3 }, 
      { translateY: -120 },
      { translateX: -120},
      { rotate: "-35deg"}
    ]
  },
  position2: {
    transform: [
      { scale: .3 }, 
      { translateY: -150 },
      { translateX: 120},
      { rotate: "35deg"}
    ]
  },
  position3: {
    transform: [
      { scale: .8 }, 
      { translateY: -60 },
      { translateX: 0 },
      { rotate: "35deg"}
    ]
  },
  position4: {
    transform: [
      { scale: .8 }, 
      { translateY: -120 },
      { translateX: -40 },
      { rotate: "-45deg"}
    ]
  },
  position5: {
    transform: [
      { scale: .7 }, 
      { translateY: -120 },
      { translateX: 40 },
      { rotate: "45deg"}
    ]
  },
  position6: {
    transform: [
      { scale: .4 }, 
      { translateY: -280 },
      { translateX: 0 },
      { rotate: "10deg"}
    ]
  }
});

AppRegistry.registerComponent('realworld', () => realworld);
