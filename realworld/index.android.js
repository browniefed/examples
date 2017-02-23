import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";

import Portland from "./portland.jpg";

export default class realworld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleCard = this.toggleCard.bind(this);
  }
  componentWillMount() {
    this.animated = new Animated.Value(0);
  }
  toggleCard() {
    this.setState((state) => ({
      open: !state.open
    }), () => {
      const toValue = this.state.open ? 1 : 0;
      Animated.timing(this.animated, {
        toValue,
        duration: 500
      }).start();
    })
  }
  render() {
    const offsetInterpolate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [191, 0]
    })
    const arrowRotate = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "0deg"]
    })

    const offsetStyle = {
      transform: [
        {
          translateY: offsetInterpolate
        }
      ]
    }

    const arrowStyle = {
      transform: [
        {
          rotate: arrowRotate
        }
      ]
    }

    const opacityStyle = {
      opacity: this.animated
    }
    return (
      <View style={styles.container}>
        <Image source={Portland} resizeMode="cover" style={styles.background}>
          <Animated.View style={[styles.card, offsetStyle]}>
            <TouchableOpacity onPress={this.toggleCard}>
              <View style={styles.header}>
                <View>
                  <Text style={styles.title}>Portland, Oregon</Text>
                  <Text style={styles.date}>June 24th</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Animated.Text style={[styles.arrow, arrowStyle]}>↓</Animated.Text>
                </View>
              </View>
            </TouchableOpacity>
            <Animated.View style={[styles.scrollViewWrap, opacityStyle]}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget sodales est. Donec facilisis, urna nec scelerisque pellentesque, nulla est euismod nunc, sed lacinia ex nunc placerat neque. Proin malesuada venenatis leo. Etiam viverra ipsum nec justo pharetra, eget rutrum enim eleifend. Ut eu mollis mi. Aenean eget nisl nibh. Sed sed elit eget nisi tincidunt elementum vitae vitae orci. Phasellus porta vitae purus eu molestie. Nulla cursus eros odio, sit amet pellentesque felis semper eu. Mauris id facilisis libero. Nullam posuere sed magna quis aliquam. Praesent sodales vulputate sollicitudin. Ut in rutrum eros, ac facilisis augue. Suspendisse consequat, erat ut convallis tincidunt, enim sem auctor ligula, sit amet congue arcu ligula at tortor. Morbi a elit varius, blandit tellus suscipit, tincidunt erat. Mauris feugiat cursus bibendum.
                </Text>
              </ScrollView>
            </Animated.View>
          </Animated.View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#152536"
  },
  background: {
    width: 300,
    height: 250,
    borderRadius: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.5)"
  },
  scrollViewWrap: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 4,
    transform: [{
      translateY: 191,
    }]
  },
  scrollView: {
    marginTop: 15
  },
  header: {
    flexDirection: "row"
  },
  title: {
    fontSize: 24,
    color: "#333"
  },
  date: {
    fontSize: 18,
    color: "#333"
  },
  arrowContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  arrow: {
    fontSize: 30,
    color: "#333"
  }
});

AppRegistry.registerComponent("realworld", () => realworld);
console.disableYellowBox = true;
