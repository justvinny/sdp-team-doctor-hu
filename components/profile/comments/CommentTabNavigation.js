import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import PublicCommentTab from "./PublicCommentTab";
import PrivateCommentTab from "./PrivateCommentTab";

/**
 * Tab Navigation used when staff are viewing patient comments as there are two types of comments:
 *  - Public which can be viewed by both staff and patient.
 *  - Private which can only be viewed by other staff.
 */
const CommentTabNavigation = ({
  tabIndex,
  setTabIndex,
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
  const menuButtonClick = (index) => {
    setTabIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={tabIndex === 0 ? styles.activeMenuButton : styles.menuButton}
          onPress={() => menuButtonClick(0)}
        >
          <Text style={styles.menuTitle}>Public</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tabIndex === 1 ? styles.activeMenuButton : styles.menuButton}
          onPress={() => menuButtonClick(1)}
        >
          <Text style={styles.menuTitle}>Private</Text>
        </TouchableOpacity>
      </View>
      {tabIndex === 0 ? (
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
      ) : (
        <PrivateCommentTab
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
    </View>
  );
};

export default CommentTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  menuButton: {
    width: "50%",
    backgroundColor: colorDefaults.primary,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  activeMenuButton: {
    width: "50%",
    backgroundColor: colorDefaults.secondary,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
