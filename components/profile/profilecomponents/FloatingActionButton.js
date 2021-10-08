import React from "react";
import { StyleSheet } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import { MaterialIcons } from "@expo/vector-icons";
import { FAB } from "react-native-elements";

export default function FloatingActionButton({
  editable,
  setEditable,
  saveChanges,
}) {
  const buttonEditClick = () => {
    if (editable) {
      saveChanges();
    }

    setEditable(!editable);
  };

  return (
    <FAB
      title={editable ? "Edit" : "Done"}
      color={colorDefaults.primary}
      //   onPress={buttonEditClick}
      placement="right"
      icon={
        editable ? (
          <MaterialIcons name="edit" size={24} color="white" />
        ) : (
          <MaterialIcons name="done" size={24} color="white" />
        )
      }
    />
  );
}

const styles = StyleSheet.create({});
