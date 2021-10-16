import React from "react";
import { StyleSheet, View } from "react-native";
import CommentReplyBox from "./CommentReplyBox";

/**
 * Comment replies component responsible for rendering all replies associated to the given parent comment.
 */
const CommentReplies = ({
  commentReplies,
  deleteReply,
  repliesHidden,
  openReplyOverlay,
  openEditingReplyOverlay,
}) => {
  return (
    <>
      {repliesHidden ? (
        <></>
      ) : (
        <View style={styles.container}>
          {commentReplies &&
            commentReplies.map((reply, index) => (
              <CommentReplyBox
                key={reply.id + index}
                reply={reply}
                deleteReply={deleteReply}
                openReplyOverlay={openReplyOverlay}
                openEditingReplyOverlay={openEditingReplyOverlay}
              />
            ))}
        </View>
      )}
    </>
  );
};

export default CommentReplies;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
