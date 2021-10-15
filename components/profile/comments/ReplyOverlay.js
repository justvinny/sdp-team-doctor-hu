import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Overlay, Switch } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import colorDefaults from "../../../theme/colorDefaults";

const ReplyOverlay = ({
  visible,
  toggleNewComment,
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
      <TouchableOpacity style={styles.button} onPress={addComment}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default ReplyOverlay;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "90%",
    borderRadius: 8,
  },
  input: {
    padding: 12,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colorDefaults.primary,
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
});
