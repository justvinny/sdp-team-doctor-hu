import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CommentBox from "./CommentBox";

/**
 * Private comment tab which only staff can view. 
 * Renders a scrollable flat list for all private comments and replies.
 */
const PrivateCommentTab = ({
  comments,
  commentReplies,
  setComments,
  deleteComment,
  deleteReply,
  editComment,
  openEditingOverlay,
  openReplyOverlay,
  openEditingReplyOverlay
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
            openEditingReplyOverlay={openEditingReplyOverlay}
          />
        )}
        keyExtractor={(item, index) => item.id + index.toString()}
        contentContainerStyle={styles.flatList}
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
  flatList: {
    paddingBottom: 80
  }
});
