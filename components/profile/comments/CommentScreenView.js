import React from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";
import CommentTabNavigation from "./CommentTabNavigation";
import LoadingScreen from "../../LoadingScreen";
import CommentOverlay from "./CommentOverlay";
import PublicCommentTab from "./PublicCommentTab";

/**
 * Comment Screen View that is the parent of all UI components related to the comment screen.
 * This is a purely UI component and does not contain logic that mutates state.
 */
const CommentScreenView = ({
  loading,
  authUser,
  tabIndex,
  setTabIndex,
  comments,
  commentReplies,
  setComments,
  setNewComment,
  deleteComment,
  deleteReply,
  editComment,
  openCommentOverlay,
  openEditingOverlay,
  openEditingReplyOverlay,
  openReplyOverlay,
  commentOverlayVisible,
  toggleCommentOverlay,
  commentPrivate,
  toggleCommentPrivate,
  newComment,
  addComment,
  editingComment,
  editReply,
  replyToComment,
  replyingComment,
  reRenderList,
  setReRenderList,
}) => {
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          {authUser.isStaff ? (
            <>
              <CommentTabNavigation
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                comments={comments}
                commentReplies={commentReplies}
                setComments={setComments}
                setNewComment={setNewComment}
                deleteComment={deleteComment}
                deleteReply={deleteReply}
                editComment={editComment}
                openEditingOverlay={openEditingOverlay}
                openEditingReplyOverlay={openEditingReplyOverlay}
                openReplyOverlay={openReplyOverlay}
                reRenderList={reRenderList}
                setReRenderList={setReRenderList}
              />
              <FAB
                icon={{ name: "add-comment", color: "white" }}
                color={colorDefaults.primary}
                placement="right"
                onPress={openCommentOverlay}
              />
            </>
          ) : (
            <PublicCommentTab
              comments={comments}
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
            editReply={editReply}
            replyToComment={replyToComment}
            replyingComment={replyingComment}
          />
        </View>
      )}
    </>
  );
};

export default CommentScreenView;

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
