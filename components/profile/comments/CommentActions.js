import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommentBox = ({
  comment,
  repliesHidden,
  toggleReplies,
  isReply,
  deleteComment,
  openEditingOverlay,
}) => {
  return (
    <View style={styles.container}>
      {isReply ? (
        <></>
      ) : (
        <TouchableOpacity onPress={toggleReplies}>
          <Text style={styles.textLink}>
            {repliesHidden ? "View Replies" : "Hide Replies"}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => openEditingOverlay(comment.id, comment.comment)}>
        <Text style={styles.textLink}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteComment(comment.id)}>
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
