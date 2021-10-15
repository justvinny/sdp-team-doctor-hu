import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentCard from "./CommentCard";
import CommentActions from "./CommentActions";

const mockReply = [
  {
    from: { first: "John", middle: "", last: "Doe" },
    comment: "This is a reply.",
  },
  {
    from: { first: "John", middle: "", last: "Doe" },
    comment: "This is a reply.",
  },
];

const CommentReplies = ({ commentReplies, repliesHidden }) => {
  return (
    <>
      {repliesHidden ? (
        <></>
      ) : (
        <View style={styles.container}>
          {commentReplies &&
            commentReplies.map((reply, index) => (
              <View key={index} style={styles.replyContainer}>
                <View style={styles.line} />
                <View style={styles.replyBox}>
                  <CommentCard
                    title={`${reply.from.first.charAt(
                      0
                    )}${reply.from.last.charAt(0)}`}
                    name={reply.from.first}
                    content={reply.reply}
                  />
                  <CommentActions isReply={true} />
                </View>
              </View>
            ))}
        </View>
      )}
    </>
  );
};

export default CommentReplies;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  replyContainer: {
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
