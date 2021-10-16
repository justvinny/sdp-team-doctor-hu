import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../../../context/AuthContext";

/**
 * Actions for comments such as View Replies, Edit, Delete, and Reply.
 * 
 * Will dynamically show actions based on logged in user.
 * 
 * Comment Owner Actions:
 * - View
 * - Reply
 * - Edit
 * - Delete
 * 
 * Non-comment Owner Actions:
 * - View
 * - Reply
 * 
 * Comment Replies also do not have View Replies as extra nesting will make the UI chaotic. Thus, all replies are
 * associated to one parent comment.
 */
const CommentActions = ({
  comment,
  repliesHidden,
  toggleReplies,
  isReply,
  deleteComment,
  deleteReply,
  openEditingOverlay,
  openReplyOverlay,
  openEditingReplyOverlay,
  hasReplies,
}) => {
  // Logged in user
  const { authUserId } = useContext(AuthContext);

  /*
    Only comments and comments with actual replies should have this action. Otherwise,
    replies to comments or comments without replies should make this action hidden.
   */
  const renderViewReplyAction = () =>
    isReply || !hasReplies ? (
      <></>
    ) : (
      <TouchableOpacity onPress={toggleReplies}>
        <Text style={styles.textLink}>
          {repliesHidden ? "View Replies" : "Hide Replies"}
        </Text>
      </TouchableOpacity>
    );

  /*
    Only authenticated users should be able to edit and delete their post.
  */
  const renderAuthenticatedUserActions = () =>
    authUserId === comment.authorId ? (
      <>
        <TouchableOpacity onPress={() => getEditingOverlayAction()}>
          <Text style={styles.textLink}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => getDeleteAction()}>
          <Text style={styles.textLink}>Delete</Text>
        </TouchableOpacity>
      </>
    ) : (
      <></>
    );

  /*
    Use the proper editing overlay function depending on if it's a reply or a new comment.
  */
  const getEditingOverlayAction = () =>
    openEditingOverlay
      ? openEditingOverlay(comment.id, comment.comment)
      : openEditingReplyOverlay(comment.id, comment.commentId, comment.reply);

  /*
  Use the proper delete function depending on if it's a reply or a new comment.
  */
  const getDeleteAction = () =>
    deleteComment
      ? deleteComment(comment.id)
      : deleteReply(comment.id, comment.commentId);

  /* 
    Gives the comment Id dynamically for both normal comments and replies.
    Reply has a commentId property to determine which comment it is associated to.
  */
  const getCommentId = () => {
    if (comment?.commentId !== undefined) {
      return comment.commentId;
    }
    return comment.id;
  };

  return (
    <View style={styles.container}>
      {renderViewReplyAction()}
      {renderAuthenticatedUserActions()}
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

export default CommentActions;

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
