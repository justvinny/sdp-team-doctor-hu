import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tab, TabView, FAB } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";
import CommentTabNavigation from "./CommentTabNavigation";

const mockData = [
  {
    from: "John",
    comment: "Hello this is a comment from John",
    replies: [],
  },
  {
    from: "Mark",
    comment: "Hello this is a comment from Mark",
    replies: [],
  },
  {
    from: "Luke",
    comment: "Hello this is a comment from Luke",
    replies: [],
  },
  {
    from: "Steff",
    comment: "Hello this is a comment from Steff",
    replies: [],
  },
];

const CommentController = ({ navigation, route }) => {
  const user = route.params?.user;

  // States
  const [comments, setComments] = useState(mockData);

  // Dynamically change header title according to passed user.
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Comments - ${user.name.first}`,
    });
  }, [navigation, route]);

  // Tab state
  const [tabIndex, setTabIndex] = useState(0);

  // Add new comment thread
  const addComment = () => {
    window.alert("New comment");
  };

  return (
    <View style={styles.container}>
      <CommentTabNavigation
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
        comments={comments}
      />
      <FAB
        icon={{ name: "add-comment", color: "white" }}
        color={colorDefaults.primary}
        placement="right"
        onPress={addComment}
      />
    </View>
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
