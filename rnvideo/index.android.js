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
} from "react-native";

import Video from "react-native-video";
import Icon from "react-native-vector-icons/FontAwesome";

import Lights from "./lights.mp4";
import Thumbnail from "./thumbnail.jpg";

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

export default class rnvideo extends Component {
  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;

    return (
      <View style={styles.container}>
        <View style={{ width, height }}>
          <Video style={StyleSheet.absoluteFill} source={Lights} resizeMode="contain" />
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.topContent, styles.padding]}>
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

          <View style={[styles.channelContent, styles.padding]}>
            <Text>Channel info w/ Subscribe</Text>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoWrap: {
    flex: 1,
  },
  scrollView: {
    flex: 5,
  },
  topContent: {},
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
  channelContent: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  playlist: {},
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
    paddingLeft: 15
  },
  playlistVideoTitle: {
    fontSize: 18
  },
  playlistSubText: {
    color: "#555"
  }
});

AppRegistry.registerComponent("rnvideo", () => rnvideo);
