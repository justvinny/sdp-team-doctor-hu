import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../../../context/AuthContext";

const CommentBox = ({
  comment,
  repliesHidden,
  toggleReplies,
  isReply,
  deleteComment,
  deleteReply,
  openEditingOverlay,
  openReplyOverlay,
  openEditingReplyOverlay,
  hasReplies
}) => {
  // Logged in user
  const { authUserId } = useContext(AuthContext);

  // Gives the comment Id dynamically for both normal comments and replies.
  // Reply has a commentId property to determine which comment it is associated to.
  const getCommentId = () => {
    if (comment?.commentId !== undefined) {
      return comment.commentId;
    }
    return comment.id;
  };

  return (
    <View style={styles.container}>
      {isReply || !hasReplies ? (
        <></>
      ) : (
        <TouchableOpacity onPress={toggleReplies}>
          <Text style={styles.textLink}>
            {repliesHidden ? "View Replies" : "Hide Replies"}
          </Text>
        </TouchableOpacity>
      )}
      {authUserId === comment.authorId ? (
        <>
          <TouchableOpacity
            onPress={() => {
              openEditingOverlay
                ? openEditingOverlay(comment.id, comment.comment)
                : openEditingReplyOverlay(
                    comment.id,
                    comment.commentId,
                    comment.reply
                  );
            }}
          >
            <Text style={styles.textLink}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteComment
                ? deleteComment(comment.id)
                : deleteReply(comment.id, comment.commentId);
            }}
          >
            <Text style={styles.textLink}>Delete</Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
      <TouchableOpacity>
        <Text
          style={styles.textLink}
          onPress={() => openReplyOverlay(getCommentId())}
        >
          Reply
        </Text>
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
