import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";

const CommentBox = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Avatar
            size="small"
            rounded
            title={`${comment.from.first.charAt(0)}${comment.from.last.charAt(0)}`}
            containerStyle={{ backgroundColor: colorDefaults.primary }}
          />
          <Text style={styles.name}>{comment.from.first}</Text>
        </View>
        <Text>{comment.comment}</Text>
      </View>
      <View style={styles.botContainer}>
        <TouchableOpacity>
          <Text style={styles.textLink}>View Replies</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textLink}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textLink}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textLink}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 8,
    padding: 8,
    marginBottom: 0,
  },
  topContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 4,
  },
  botContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textLink: {
    color: "grey",
    marginRight: 8,
    fontSize: 12,
  },
});
