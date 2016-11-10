import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  UIManager,
  findNodeHandle
} from 'react-native';

export default class measure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurements: {}
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View 
          ref={(ref) => this.view = ref }
          style={styles.measure} 
          onLayout={({ nativeEvent }) => this.setState({ measurements: nativeEvent.layout })}
        >
          <Text>Measure Me</Text>
        </View>
        <View>
          <Text>Width: {this.state.measurements.width}</Text>
          <Text>Height: {this.state.measurements.height}</Text>
          <Text>X: {this.state.measurements.x}</Text>
          <Text>Y: {this.state.measurements.y}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  measure: {
    padding: 30,
    borderWidth: 1,
  }
});

AppRegistry.registerComponent('measure', () => measure);
