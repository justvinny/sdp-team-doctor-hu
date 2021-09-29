import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colorDefaults from "../../theme/colorDefaults";

const DeleteFab = ({ deleteAllNotifications }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={deleteAllNotifications}>
      <AntDesign name="delete" size={35} color="white" />
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
    margin: 16,
    backgroundColor: colorDefaults.primary,
    height: 70,
    width: 70,
    borderRadius: 35,
    elevation: 5,
  },
});
