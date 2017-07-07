import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Animated,
  Platform,
  StatusBar
} from "react-native";

import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";

import Lights from "./lights.mp4";
import Thumbnail from "./thumbnail.jpg";
import ChannelIcon from "./icon.png";

const TouchableIcon = ({ name, children }) => {
  return (
    <TouchableOpacity style={styles.touchIcon}>
      <Icon name={name} size={30} color="#767577" />
      <Text style={styles.iconText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const PlaylistVideo = ({ name, channel, views, image }) => {
  return (
    <View style={styles.playlistVideo}>
      <Image source={image} style={styles.playlistThumbnail} resizeMode="cover" />
      <View style={styles.playlistText}>
        <Text style={styles.playlistVideoTitle}>
          {name}
        </Text>
        <Text style={styles.playlistSubText}>
          {channel}
        </Text>
        <Text style={styles.playlistSubText}>
          {views} views
        </Text>
      </View>
    </View>
  );
};

console.log();

export default class rnvideo extends Component {
  componentWillMount() {
    this._y = 0;
    this._animation = new Animated.Value(0);
    this._animation.addListener(({ value }) => {
      this._y = value;
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dy: this._animation,
        },
      ]),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(this._animation, {
            toValue: 300,
            duration: 200,
          }).start();
          this._animation.setOffset(300);
        } else {
          this._animation.setOffset(0);
          Animated.timing(this._animation, {
            toValue: 0,
            duration: 200,
          }).start();
        }
      },
    });
  }
  handleOpen = () => {
    this._animation.setOffset(0);
    Animated.timing(this._animation, {
      toValue: 0,
      duration: 200,
    }).start();
  }
  render() {
    const { width, height: screenHeight  } = Dimensions.get("window");
    const videoHeight = width * 0.5625;

    const padding = 15;
    const statusBarHeight = StatusBar.currentHeight || 0;
    const yOutput = ((screenHeight - videoHeight) + (( videoHeight * .5) / 2)) - padding - statusBarHeight;
    const xOutput = ((width * .5) / 2) - padding;

    const opacityInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0],
    });

    const translateYInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, yOutput],
      extrapolate: "clamp",
    });

    const scaleInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });

    const translateXInterpolate = this._animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, xOutput],
      extrapolate: "clamp",
    });

    const scrollStyles = {
      opacity: opacityInterpolate,
      transform: [
        {
          translateY: translateYInterpolate,
        },
      ],
    };

    const videoStyles = {
      transform: [
        {
          translateY: translateYInterpolate,
        },
        {
          translateX: translateXInterpolate,
        },
        {
          scale: scaleInterpolate,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleOpen}>
          <Text>Content Below: Click To Reopen Video</Text>
        </TouchableOpacity>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View
            style={[{ width, height: videoHeight }, videoStyles]}
            {...this._panResponder.panHandlers}
          >
            <Video repeat style={StyleSheet.absoluteFill} source={Lights} resizeMode="contain" />
          </Animated.View>
          <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
            <View style={styles.padding}>
              <Text style={styles.title}>Beautiful DJ Mixing Lights</Text>
              <Text>1M Views</Text>
              <View style={styles.likeRow}>
                <TouchableIcon name="thumbs-up">10,000</TouchableIcon>
                <TouchableIcon name="thumbs-down">3</TouchableIcon>
                <TouchableIcon name="share">Share</TouchableIcon>
                <TouchableIcon name="download">Save</TouchableIcon>
                <TouchableIcon name="plus">Add to</TouchableIcon>
              </View>
            </View>

            <View style={[styles.channelInfo, styles.padding]}>
              <Image
                source={ChannelIcon}
                style={styles.channelIcon}
                resizeMode="contain"
              />
              <View style={styles.channelText}>
                <Text style={styles.channelTitle}>Prerecorded MP3s</Text>
                <Text>1M Subscribers</Text>
              </View>
            </View>

            <View style={[styles.playlist, styles.padding]}>
              <Text style={styles.playlistUpNext}>Up next</Text>
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
              <PlaylistVideo
                image={Thumbnail}
                name="Next Sweet DJ Video"
                channel="Prerecorded MP3s"
                views="380K"
              />
            </View>
          </Animated.ScrollView>
        </View>
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
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
  },
  likeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  touchIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    marginTop: 5,
  },
  padding: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  channelInfo: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  channelIcon: {
    width: 50,
    height: 50,
  },
  channelText: {
    marginLeft: 15,
  },
  channelTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  playlistUpNext: {
    fontSize: 24,
  },
  playlistVideo: {
    flexDirection: "row",
    height: 100,
    marginTop: 15,
    marginBottom: 15,
  },
  playlistThumbnail: {
    width: null,
    height: null,
    flex: 1,
  },
  playlistText: {
    flex: 2,
    paddingLeft: 15,
  },
  playlistVideoTitle: {
    fontSize: 18,
  },
  playlistSubText: {
    color: "#555",
  },
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
