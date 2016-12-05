import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Images = [
  { image: require('./images/drink1.jpg'), title: "Vokda Cran" },
  { image: require('./images/drink2.jpg'), title: "Old Fashion"},
  { image: require('./images/drink3.jpg'), title: "Mule" },
  { image: require('./images/drink4.jpg'), title: "Strawberry Daiquiri" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  }
});

AppRegistry.registerComponent('realworld', () => App);
