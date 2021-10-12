import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CommentBox from "./CommentBox";

const PublicCommentTab = ({ comments }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentBox comment={item} />}
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
