import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tab, TabView, FAB } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";
import CommentTabNavigation from "./CommentTabNavigation";
import AuthContext from "../../../context/AuthContext";
import LoadingScreen from "../../LoadingScreen";
import firestoreService from "../../../firebase/firestoreService";
import CommentOverlay from "./CommentOverlay";

const mockData = [
  {
    from: { first: "John", middle: "", last: "Doe" },
    comment: "Hello this is a comment from John",
    replies: [],
  },
  {
    from: { first: "Mark", middle: "", last: "Rip" },
    comment: "Hello this is a comment from Mark",
    replies: [],
  },
  {
    from: { first: "Luke", middle: "", last: "Schmuke" },
    comment: "Hello this is a comment from Luke",
    replies: [],
  },
  {
    from: { first: "Steff", middle: "", last: "Hoops" },
    comment: "Hello this is a comment from Steff",
    replies: [],
  },
];

const CommentController = ({ navigation, route }) => {
  const user = route.params?.user;
  const { authUserId } = useContext(AuthContext);

  // States
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const [comments, setComments] = useState(mockData);
  const [newComment, setNewComment] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [newCommentVisible, setNewCommentVisible] = useState(false);
  const [commentPrivate, setCommentPrivate] = useState(false);

  // Hooks
  useEffect(() => {
    firestoreService.getUserById(authUserId).then((user) => {
      setAuthUser(user);
      setLoading(false);
    });
  }, []);

  // Dynamically change header title according to passed user.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Comments - ${user.name.first}`,
    });
  }, [navigation, route]);

  // Comment action functions
  const toggleNewComment = () => {
    setNewCommentVisible(!newCommentVisible);
  };

  const toggleCommentPrivate = () => {
    setCommentPrivate(!commentPrivate);
  }

  const addComment = () => {
    const _newComment = {
      authorId: authUserId,
      from: authUser.name,
      comment: newComment,
      replies: [],
      isPrivate: commentPrivate,
      timestamp: Date.now()
    }
    setComments([...comments, _newComment]);
    toggleNewComment();
    setNewComment("");
  };
  
  const deleteComment = () => {
  }

  const editComment = () => {

  }

  const replyToComment = () => {

  }

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <CommentTabNavigation
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            comments={comments}
            setComments={setComments}
            deleteComment={deleteComment}
            editComment={editComment}
            replyToComment={replyToComment}
          />
          <FAB
            icon={{ name: "add-comment", color: "white" }}
            color={colorDefaults.primary}
            placement="right"
            onPress={toggleNewComment}
          />
          <CommentOverlay
            visible={newCommentVisible}
            toggleNewComment={toggleNewComment}
            commentPrivate={commentPrivate}
            toggleCommentPrivate={toggleCommentPrivate}
            newComment={newComment}
            setNewcomment={setNewComment}
            addComment={addComment}
          />
        </View>
      )}
    </>
  );
};

export default CommentController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.primary,
  },
  tabTitle: {
    color: "#fff",
  },
  indicatorStyle: {
    backgroundColor: "black",
  },
  activeButton: {
    backgroundColor: colorDefaults.secondary,
  },
  button: {
    backgroundColor: colorDefaults.primary,
  },
  tabViewContainer: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
  },
});
