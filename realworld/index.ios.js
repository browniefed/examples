import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  ProgressViewIOS
} from 'react-native';

export default class realworld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
      bgAnimate: new Animated.Value(0),
      progressValue: 0,
      progress: false,
      error: false,
      success: false,
      didError: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.animateError = this.animateError.bind(this);
    this.animateProgress = this.animateProgress.bind(this);
    this.animateSuccess = this.animateSuccess.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset(cb) {
    this.state.bgAnimate.setValue(0);
    this.state.animate.setValue(0);
    this.setState({
      progress: false,
      error: false,
      success: false,
    }, cb)
  }
  handleSubmit() {
    this.reset(() => {
      Animated.timing(this.state.animate, {
        toValue: 1,
        duration: 400
      }).start(() => this.animateProgress());
    })
  }

  animateProgress() {
    this.setState({ progress: true, progressValue: 0 }, () => {
      this.updateProgress(() => {
        this.state.didError ? this.animateSuccess() : this.animateError();
        setTimeout(() => this.reset(), 2000);
      });
    });
  }
  updateProgress(cb) {
    var progressValue = this.state.progressValue + 0.01;
    if (progressValue > 1) return cb();
    this.setState({ progressValue });
    requestAnimationFrame(() => this.updateProgress(cb));
  }
  animateError() {
    this.setState({ error: true, progress: false, didError: true, });
    this.state.bgAnimate.setValue(1);
  }
  animateSuccess() {
    this.setState({ success: true, progress: false, error: false, didError: false })
    this.state.bgAnimate.setValue(2);
    this.state.animate.setValue(0);
  }
  render() {
    const btnColorAnimation = this.state.bgAnimate.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['rgb(101,69,89)', 'rgb(250, 34, 33)', "rgb(255,255,255)"]
    })

    const scaleAnimation = this.state.animate.interpolate({
      inputRange: [0, .1],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    const textStyle = {
      transform: [
        { scale: scaleAnimation }
      ]
    }

    const activityScale = this.state.animate.interpolate({
      inputRange: [.8, .9],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })

    const animatedIndicatorStyle = {
      transform: [
        { scale: activityScale }
      ]
    }

    const widthAnimation = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [250, 60]
    })
    const buttonStyle = {
      backgroundColor: btnColorAnimation,
      width: widthAnimation,
    }

    const whiteStripAnimation = this.state.animate.interpolate({
      inputRange: [.5, 1],
      outputRange: [30, 250]
    });
    const whiteStripStyle = {
      width: whiteStripAnimation
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleSubmit}>
          <View style={styles.interactive}>

            <Animated.View style={[styles.whiteStrip, whiteStripStyle]}>
              {this.state.error && <Text style={styles.error}>Oops! Something went wrong!</Text>}
              {this.state.progress && <ProgressViewIOS progress={this.state.progressValue} progressTintColor="#9ce75b" />}
            </Animated.View>

            <Animated.View style={[styles.button, buttonStyle]}>
              <Animated.View style={[styles.btnText, textStyle]}>
                {!this.state.success && <Animated.Text style={[styles.text]}>Submit</Animated.Text>}
                {this.state.success && <Text style={styles.successText}>✓ Success!</Text>}
              </Animated.View>
              <Animated.View style={animatedIndicatorStyle}>
                {this.state.progress && <ActivityIndicator animating color="#FFF" size="small" />}
                {this.state.error && <Text style={styles.errorX}>X</Text>}
              </Animated.View>
            </Animated.View>

          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDEAED"
  },
  interactive: {
    width: 250,
    height: 60,
  },

  whiteStrip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    height: 60,
    borderRadius: 60,
    paddingLeft: 60,
    paddingRight: 5,
    justifyContent: "center",
  },
  error: {
    color: "rgb(250, 34, 33)",
    textAlign: "center",
  },

  btnText: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  errorX: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold"
  },
  successText: {
    color: "#9ce75b",
    fontSize: 24,
  },
  text: {
    color: "#FFF",
    fontSize: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30
  }
});

AppRegistry.registerComponent('realworld', () => realworld);
