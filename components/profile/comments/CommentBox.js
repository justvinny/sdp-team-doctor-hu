import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import CommentCard from "./CommentCard";
import CommentActions from "./CommentActions";
import CommentReplies from "./CommentReplies";

const CommentBox = ({ comment }) => {
  // State
  const [repliesHidden, setRepliesHidden] = useState(true);

  // Toggle hidden replies
  const toggleReplies = () => { 
    setRepliesHidden(!repliesHidden);
  }

  return (
    <View style={styles.container}>
      <CommentCard comment={comment} />
      <CommentActions repliesHidden={repliesHidden} toggleReplies={toggleReplies} />
      <CommentReplies repliesHidden={repliesHidden}/>
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
  }
});
