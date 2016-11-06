import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class animatedbasic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={[styles.flipCard]}>
            <Text style={styles.flipText}>
              This text is flipping on the front.
            </Text>
          </View>
          <View style={[styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>
              This text is flipping on the back.
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text>Flip!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
});

AppRegistry.registerComponent('animatedbasic', () => animatedbasic);
