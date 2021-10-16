import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import CommentBox from "./CommentBox";

/**
 * Public comment tab which can be viewed by both patient and staff.
 * Renders a scrolalble flat list for all public comments and replies.
 */
const PublicCommentTab = ({
  comments,
  commentReplies,
  setComments,
  deleteComment,
  deleteReply,
  editComment,
  openEditingOverlay,
  openReplyOverlay,
  openEditingReplyOverlay,
  reRenderList,
  setReRenderList,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={comments.filter((comment) => !comment.isPrivate)}
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
            reRenderList={reRenderList}
            setReRenderList={setReRenderList}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
        extraData={reRenderList}
      />
    </View>
  );
};

export default PublicCommentTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
  },
  flatList: {
    paddingBottom: 80,
  },
});
