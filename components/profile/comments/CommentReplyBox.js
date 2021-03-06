import React from "react";
import { StyleSheet, View } from "react-native";
import CommentCard from "./CommentCard";
import CommentActions from "./CommentActions";
import dateUtility from "../../../utilities/dateUtility";

/**
 * Comment Reply Box component that contains reply information such as:
 *  - Reply author
 *  - Reply avatar
 *  - Reply message
 *  - Reply actions such as
 *    - Edit
 *    - Delete
 *    - Reply
 */
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
          date={dateUtility.getFormattedDateNow(new Date(reply.timestamp))}
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
  line: {
    backgroundColor: "green",
    width: "2.5%",
    height: "85%",
    marginRight: 8,
  },
});
