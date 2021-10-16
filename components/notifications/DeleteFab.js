import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colorDefaults from "../../theme/colorDefaults";

/*
  Floating action button for deleting notifications.
*/
const DeleteFab = ({ deleteAllNotifications }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={deleteAllNotifications}>
      <AntDesign name="delete" size={25} color="white" />
    </TouchableOpacity>
  );
};

export default DeleteFab;

const styles = StyleSheet.create({
  fab: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 12,
    backgroundColor: colorDefaults.primary,
    height: 56,
    width: 56,
    borderRadius: 28,
    elevation: 5,
  },
});
