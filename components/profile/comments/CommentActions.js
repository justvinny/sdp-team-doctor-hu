import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommentBox = ({ comment, repliesHidden, toggleReplies }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleReplies}>
        <Text style={styles.textLink}>{repliesHidden ? "View Replies" : "Hide Replies"}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textLink}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textLink}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.textLink}>Reply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textLink: {
    color: "grey",
    marginRight: 8,
    fontSize: 12,
  },
});
