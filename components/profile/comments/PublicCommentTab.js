import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CommentBox from "./CommentBox";

const PublicCommentTab = ({
  comments,
  setComments,
  deleteComment,
  editComment,
  replyToComment,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={comments.filter(comment => !comment.isPrivate)}
        renderItem={({ item }) => (
          <CommentBox
            comment={item}
            setComments={setComments}
            deleteComment={deleteComment}
            editComment={editComment}
            replyToComment={replyToComment}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PublicCommentTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
