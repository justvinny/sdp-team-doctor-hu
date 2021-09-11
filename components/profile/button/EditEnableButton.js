import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colorDefaults from "../../../theme/colorDefaults";

export default function EditEnableButton() {
  let enabled = false;

  const doneIcon = (
    <View style={styles.icon}>
      <MaterialIcons
        name="done"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
      <Text>Done</Text>
    </View>
  );

  const editIcon = (
    <View style={styles.icon}>
      <MaterialIcons
        name="edit"
        size={24}
        color="black"
        style={{ marginRight: 5 }}
      />
      <Text>Edit</Text>
    </View>
  );

  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text>{enabled ? doneIcon : editIcon}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorDefaults.bottomBorderColor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
