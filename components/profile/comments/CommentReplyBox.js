import React from "react";
import { StyleSheet, View } from "react-native";
import CommentCard from "./CommentCard";
import CommentActions from "./CommentActions";

const CommentReplyBox = ({
  reply,
  deleteReply,
  openReplyOverlay,
  openEditingReplyOverlay,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.replyBox}>
        <CommentCard
          title={`${reply.from.first.charAt(0)}${reply.from.last.charAt(0)}`}
          name={`${reply.from.first} ${reply.from.last}`}
          content={reply.reply}
          picture={reply.authorPicture}
        />
        <CommentActions
          isReply={true}
          comment={reply}
          deleteReply={deleteReply}
          openReplyOverlay={openReplyOverlay}
          openEditingReplyOverlay={openEditingReplyOverlay}
        />
      </View>
    </View>
  );
};

export default CommentReplyBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: "row",
  },
  replyBox: {
    flex: 1,
  },
});
