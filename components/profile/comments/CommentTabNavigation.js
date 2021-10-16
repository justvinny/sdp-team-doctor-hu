import React from "react";
import { StyleSheet } from "react-native";
import { Tab, TabView } from "react-native-elements";
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
  openEditingReplyOverlay
}) => {
  return (
    <>
      <Tab
        value={tabIndex}
        onChange={setTabIndex}
        indicatorStyle={styles.indicatorStyle}
      >
        <Tab.Item
          titleStyle={styles.tabTitle}
          title="public"
          buttonStyle={[tabIndex == 0 ? styles.activeButton : styles.button]}
        />
        <Tab.Item
          titleStyle={styles.tabTitle}
          title="private"
          buttonStyle={[tabIndex == 1 ? styles.activeButton : styles.button]}
        />
      </Tab>
      <TabView value={tabIndex} onChange={setTabIndex}>
        <TabView.Item style={styles.tabViewContainer}>
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
          />
        </TabView.Item>
        <TabView.Item style={styles.tabViewContainer}>
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
          />
        </TabView.Item>
      </TabView>
    </>
  );
};

export default CommentTabNavigation;

const styles = StyleSheet.create({
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
