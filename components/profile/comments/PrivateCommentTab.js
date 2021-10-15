import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CommentBox from "./CommentBox";

const PrivateCommentTab = ({
  comments,
  commentReplies,
  setComments,
  deleteComment,
  deleteReply,
  editComment,
  openEditingOverlay,
  openReplyOverlay
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={comments.filter(comment => comment.isPrivate)}
        renderItem={({ item }) => (
          <CommentBox
            comment={item}
            commentReplies={commentReplies}
            setComments={setComments}
            deleteComment={deleteComment}
            deleteReply={deleteReply}
            editComment={editComment}
            openEditingOverlay={openEditingOverlay}
            openReplyOverlay={openReplyOverlay}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PrivateCommentTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
