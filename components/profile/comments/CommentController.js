import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";
import CommentTabNavigation from "./CommentTabNavigation";
import AuthContext from "../../../context/AuthContext";
import LoadingScreen from "../../LoadingScreen";
import firestoreService from "../../../firebase/firestoreService";
import CommentOverlay from "./CommentOverlay";

const CommentController = ({ navigation, route }) => {
  const user = route.params?.user;
  const { authUserId } = useContext(AuthContext);

  // States
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const [viewedUser, setViewedUser] = useState();
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    firestoreService.getUserById(user.id).then((user) => {
      if (user?.comments) {
        setComments(user.comments);
      }
      setLoading(false);
    });
  }, []);

  // Dynamically change header title according to passed user.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Comments - ${user.name.first}`,
    });
  }, [navigation, route]);

  // Other functions
  const toggleNewComment = () => {
    setNewCommentVisible(!newCommentVisible);
  };

  const toggleCommentPrivate = () => {
    setCommentPrivate(!commentPrivate);
  };

  const getCommentId = () => {
    return comments.length > 0 ? comments[comments.length - 1].id + 1 : 0;
  };

  const addComment = () => {
    if (newComment) {
      const _newComment = {
        id: getCommentId(),
        authorId: authUserId,
        from: authUser.name,
        comment: newComment,
        replies: [],
        isPrivate: commentPrivate,
        timestamp: Date.now(),
      };
      firestoreService.addComment(user.id, _newComment);
      setComments([...comments, _newComment]);
      toggleNewComment();
      setNewComment("");
    }
  };

  const deleteComment = (id) => {
    if (id) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
      firestoreService.updateComments(user.id, updatedComments);
    }
  };

  const editComment = () => {};

  const replyToComment = () => {};

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
