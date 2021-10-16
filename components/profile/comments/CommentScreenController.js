import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import CommentScreenView from "./CommentScreenView";

/**
 * Comment Screen Controller that contains all the states and functionality of our comment screen.
 * Firebase API calls are located here and various fucntions that mutate react state.
 */
const CommentScreenController = ({ navigation, route }) => {
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
  const [commentOverlayVisible, setCommentOverlayVisible] = useState(false);
  const [commentPrivate, setCommentPrivate] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(0);
  const [selectedReplyId, setSelectedReplyId] = useState(0);
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
        setLatestReplyId(latestId.id + 1);
      }

      setLoading(false);
    });
  }, []);

  // Dynamically change header title according to passed user.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Comments - ${user.name.first} ${user.name.last}`,
    });
  }, [navigation, route]);

  /*
    Other functions
  */
  const toggleCommentOverlay = () => {
    setCommentOverlayVisible(!commentOverlayVisible);
  };

  const openCommentOverlay = () => {
    setNewComment("");
    setEditingComment(false);
    setReplyingComment(false);
    setCommentOverlayVisible(true);
  };

  const openEditingOverlay = (id, comment) => {
    setSelectedCommentId(id);
    setNewComment(comment);
    setEditingComment(true);
    setReplyingComment(false);
    setCommentOverlayVisible(true);
  };

  const openReplyOverlay = (id) => {
    setNewComment("");
    setSelectedCommentId(id);
    setEditingComment(false);
    setReplyingComment(true);
    setCommentOverlayVisible(true);
  };

  const openEditingReplyOverlay = (id, commentId, comment) => {
    setSelectedReplyId(id);
    setSelectedCommentId(commentId);
    setNewComment(comment);
    setEditingComment(true);
    setReplyingComment(true);
    setCommentOverlayVisible(true);
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
        authorPicture: authUser.picture === undefined ? "" : authUser.picture,
        from: authUser.name,
        comment: newComment,
        isPrivate: commentPrivate,
        timestamp: Date.now(),
      };

      setComments([...comments, _newComment]);
      toggleCommentOverlay();
      firestoreService.addComment(user.id, _newComment);
    }
  };

  const deleteComment = (id) => {
    if (id !== undefined) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
      firestoreService.updateComments(user.id, updatedComments);
    }
  };

  const deleteReply = (id, commentId) => {
    if (id !== undefined && commentId !== undefined) {
      const _commentReplies = new Map(commentReplies);
      const updatedRepliesArr = _commentReplies
        .get(commentId)
        .filter((reply) => reply.id !== id);
      _commentReplies.set(commentId, updatedRepliesArr);

      setCommentReplies(_commentReplies);
      firestoreService.updateCommentReplies(
        user.id,
        mapToArray(_commentReplies)
      );
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

    // Save the edited comment to our comments array by replacing its old object with the new one.
    const _comments = comments.filter(
      (comment) => comment.id !== selectedCommentId
    );
    const editedComments = [..._comments, editedComment].sort(
      (a, b) => a.id - b.id
    );

    setComments(editedComments);
    setCommentOverlayVisible(false);
    firestoreService.updateComments(user.id, editedComments);
  };

  const editReply = () => {
    const _commentReplies = new Map(commentReplies);
    const selectedReply = _commentReplies
      .get(selectedCommentId)
      .find((reply) => reply.id === selectedReplyId);
    const updatedReply = {
      ...selectedReply,
      reply: newComment,
    };

    // Save the edited reply the specific map value array to replace the old reply.
    const _repliesToComment = _commentReplies
      .get(selectedCommentId)
      .filter((reply) => reply.id !== selectedReplyId);
    _commentReplies.set(selectedCommentId, [
      ..._repliesToComment,
      updatedReply,
    ]);

    setCommentReplies(_commentReplies);
    setCommentOverlayVisible(false);
    firestoreService.updateCommentReplies(user.id, mapToArray(_commentReplies));
  };

  const replyToComment = () => {
    if (newComment) {
      const _reply = {
        id: latestReplyId,
        commentId: selectedCommentId,
        authorId: authUserId,
        authorPicture: authUser.picture === undefined ? "" : authUser.picture,
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

      setCommentReplies(_commentReplies);
      setLatestReplyId(latestReplyId + 1);
      firestoreService.addCommentReply(user.id, _reply);
      toggleCommentOverlay();
    }
  };

  const mapToArray = (map) => {
    // Transform to array before storing in firestore
    let arr = [];
    map.forEach((value) => {
      if (value?.length > 0) {
        arr = [...arr, ...value];
      }
    });
    return arr;
  };

  return (
    <CommentScreenView
      loading={loading}
      authUser={authUser}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      comments={comments}
      commentReplies={commentReplies}
      setComments={setComments}
      setNewComment={setNewComment}
      deleteComment={deleteComment}
      deleteReply={deleteReply}
      editComment={editComment}
      openCommentOverlay={openCommentOverlay}
      openEditingOverlay={openEditingOverlay}
      openEditingReplyOverlay={openEditingReplyOverlay}
      openReplyOverlay={openReplyOverlay}
      commentOverlayVisible={commentOverlayVisible}
      toggleCommentOverlay={toggleCommentOverlay}
      commentPrivate={commentPrivate}
      toggleCommentPrivate={toggleCommentPrivate}
      newComment={newComment}
      addComment={addComment}
      editingComment={editingComment}
      editReply={editReply}
      replyToComment={replyToComment}
      replyingComment={replyingComment}
    />
  );
};

export default CommentScreenController;
