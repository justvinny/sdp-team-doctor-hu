import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay, Switch } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import colorDefaults from "../../../theme/colorDefaults";

const CommentOverlay = ({
  visible,
  toggleNewComment,
  commentPrivate,
  toggleCommentPrivate,
  newComment,
  setNewcomment,
  addComment,
}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleNewComment}
      overlayStyle={styles.container}
    >
      <TextInput
        placeholder="Write a comment..."
        value={newComment}
        onChangeText={setNewcomment}
        style={styles.input}
        multiline
      />
      <View style={styles.botContainer}>
        <View style={styles.switch}>
          <Text style={styles.switchText}>Private</Text>
          <Switch
            value={commentPrivate}
            onValueChange={toggleCommentPrivate}
            color={colorDefaults.primary}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default CommentOverlay;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "90%",
    borderRadius: 8,
  },
  botContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    padding: 12,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colorDefaults.primary
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: colorDefaults.primary,
    width: "25%",
    alignSelf: "flex-end",
    marginRight: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switch: {
      marginLeft: 16,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      borderColor: colorDefaults.primary,
  },
  switchText: {
      fontSize: 16,
      fontWeight: "700",
      color: colorDefaults.primary,
      marginRight: 4
  }
});
