import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";

const CommentCard = ({ title, name, content }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Avatar
          size="small"
          rounded
          title={title}
          containerStyle={{ backgroundColor: colorDefaults.primary }}
        />
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
