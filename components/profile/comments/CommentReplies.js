import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CommentReplies = ({ repliesHidden }) => {
  return (
    <View style={repliesHidden ? styles.hide : styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default CommentReplies;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  hide: {
    height: 0,
    width: 0,
    padding: 0,
  },
});
