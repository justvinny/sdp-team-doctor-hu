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

  /*
    States
  */
  // Loading screen when data is not loaded yet from firebase
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  // Users
  const [authUser, setAuthUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentReplies, setCommentReplies] = useState(new Map());
  const [latestReplyId, setLatestReplyId] = useState(0);

  // Comment overlay
  const [commentOverlayVisible, setCommentOveralVisible] = useState(false);
  const [commentPrivate, setCommentPrivate] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const [editingComment, setEditingComment] = useState(false);
  const [replyingComment, setReplyingComment] = useState(false);

  /*
    Hooks
  */
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

      if (user?.commentReplies) {
        // Transform firestore array of replies to map data structure using the comment id as key
        // for ease of querying
        const transformedMap = user.commentReplies.reduce(
          (map, currentValue) => {
            if (!map.has(currentValue.commentId)) {
              map.set(currentValue.commentId, []);
            }
            map.get(currentValue.commentId).push(currentValue);
            return map;
          },
          new Map()
        );

        // Get the highest id value which will be used to calculate the new id value for replies.
        const latestId = user.commentReplies.reduce(
          (previousValue, currentValue) =>
            previousValue > currentValue ? previousValue : currentValue,
          -1
        );

        // Update states
        setCommentReplies(transformedMap);
        setLatestReplyId(latestId + 1);
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

  /*
    Other functions
  */
  const toggleCommentOverlay = () => {
    setCommentOveralVisible(!commentOverlayVisible);
  };

  const openCommentOverlay = () => {
    setNewComment("");
    setEditingComment(false);
    setReplyingComment(false);
    setCommentOveralVisible(true);
  };

  const openEditingOverlay = (id, comment) => {
    setSelectedCommentId(id);
    setNewComment(comment);
    setEditingComment(true);
    setReplyingComment(false);
    setCommentOveralVisible(true);
  };

  const openReplyOverlay = (id) => {
    setNewComment("");
    setSelectedCommentId(id);
    setEditingComment(false);
    setReplyingComment(true);
    setCommentOveralVisible(true);
  };

  const openEditingReplyOverlay = (id, comment) => {
    setSelectedCommentId(id);
    setNewComment(comment);
    setEditingComment(true);
    setReplyingComment(true);
    setCommentOveralVisible(true);
  };

  const toggleCommentPrivate = () => {
    setCommentPrivate(!commentPrivate);
  };

  const getNextId = (arr) => {
    return arr.length > 0 ? arr[arr.length - 1].id + 1 : 0;
  };

  const addComment = () => {
    if (newComment) {
      const _newComment = {
        id: getNextId(comments),
        authorId: authUserId,
        from: authUser.name,
        comment: newComment,
        isPrivate: commentPrivate,
        timestamp: Date.now(),
      };
      firestoreService.addComment(user.id, _newComment);
      setComments([...comments, _newComment]);
      toggleCommentOverlay();
    }
  };

  const deleteComment = (id) => {
    if (id) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
      firestoreService.updateComments(user.id, updatedComments);
    }
  };

  const editComment = () => {
    // Store newly edited comment into new object.
    const selectedComment = comments.find(
      (comment) => selectedCommentId === comment.id
    );
    const editedComment = {
      ...selectedComment,
      comment: newComment,
    };

    // Save the edited comment our comments array by replacing its old object with the new one.
    const _comments = comments.filter(
      (comment) => comment.id !== selectedCommentId
    );
    const editedComments = [..._comments, editedComment].sort(
      (a, b) => a.id - b.id
    );
    firestoreService.updateComments(user.id, editedComments);
    setComments(editedComments);
    setCommentOveralVisible(false);
  };

  const replyToComment = () => {
    if (newComment) {
      const _reply = {
        id: latestReplyId,
        commentId: selectedCommentId,
        authorId: authUserId,
        from: authUser.name,
        reply: newComment,
        timestamp: Date.now(),
      };

      // Clone old map and add new reply to newly cloned map.
      const _commentReplies = new Map(commentReplies);
      if (!_commentReplies.has(_reply.commentId)) {
        _commentReplies.set(_reply.commentId, []);
      }
      _commentReplies.get(_reply.commentId).push(_reply);

      firestoreService.addCommentReply(user.id, _reply);
      setCommentReplies(_commentReplies);
      setLatestReplyId(latestReplyId + 1);
      toggleCommentOverlay();
    }
  };

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
            commentReplies={commentReplies}
            setComments={setComments}
            setNewComment={setNewComment}
            deleteComment={deleteComment}
            editComment={editComment}
            openEditingOverlay={openEditingOverlay}
            openReplyOverlay={openReplyOverlay}
          />
          <FAB
            icon={{ name: "add-comment", color: "white" }}
            color={colorDefaults.primary}
            placement="right"
            onPress={openCommentOverlay}
          />
          <CommentOverlay
            visible={commentOverlayVisible}
            toggleOverlay={toggleCommentOverlay}
            commentPrivate={commentPrivate}
            toggleCommentPrivate={toggleCommentPrivate}
            newComment={newComment}
            setNewcomment={setNewComment}
            addComment={addComment}
            editComment={editComment}
            editingComment={editingComment}
            replyToComment={replyToComment}
            replyingComment={replyingComment}
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
