import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import CommentCard from "./CommentCard";
import CommentActions from "./CommentActions";
import CommentReplies from "./CommentReplies";

const CommentBox = ({
  comment,
  commentReplies,
  deleteComment,
  deleteReply,
  openEditingOverlay,
  openReplyOverlay,
  openEditingReplyOverlay
}) => {
  // State
  const [repliesHidden, setRepliesHidden] = useState(true);

  // Toggle hidden replies
  const toggleReplies = () => {
    setRepliesHidden(!repliesHidden);
  };

  return (
    <View style={styles.container}>
      <CommentCard
        title={`${comment.from.first.charAt(0)}${comment.from.last.charAt(0)}`}
        name={`${comment.from.first} ${comment.from.last}`}
        content={comment.comment}
      />
      <CommentActions
        comment={comment}
        repliesHidden={repliesHidden}
        toggleReplies={toggleReplies}
        deleteComment={deleteComment}
        openEditingOverlay={openEditingOverlay}
        openReplyOverlay={openReplyOverlay}
        hasReplies={commentReplies.get(comment.id)?.length > 0 ? true : false}
      />
      <CommentReplies
        commentReplies={commentReplies.get(comment.id)}
        deleteReply={deleteReply}
        repliesHidden={repliesHidden}
        openReplyOverlay={openReplyOverlay}
        openEditingReplyOverlay={openEditingReplyOverlay}
      />
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 8,
    padding: 8,
    marginBottom: 0,
    paddingBottom: 0,
  },
});
