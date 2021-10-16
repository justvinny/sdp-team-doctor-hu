import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";

/**
 * Comment card component that contains the commenter's picture, name, and message.
 */
const CommentCard = ({ title, name, content, picture }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        {picture ? (
          <Avatar
            size="small"
            rounded
            title={title}
            source={{uri: picture}}
            containerStyle={{ backgroundColor: colorDefaults.primary }}
          />
        ) : (
          <Avatar
            size="small"
            rounded
            title={title}
            containerStyle={{ backgroundColor: colorDefaults.primary }}
          />
        )}
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text>{content}</Text>
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 4,
  },
});
