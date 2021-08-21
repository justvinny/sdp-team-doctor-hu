import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colorDefaults from "../../theme/colorDefaults";

function AboutTab() {
  const [enabled, setEnabled] = useState(false);

  function editText() {
    /* if (enabled) {
          save();
          let updatedUser = {
            ...user,
            name: {
              first: firstName,
              middle: middleName,
              last: lastName,
            },
          };
          setUser(updatedUser);
        } */

    enabled ? setEnabled(false) : setEnabled(true);
  }

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        editable={enabled}
      >
        Hello World
      </TextInput>
      <TouchableOpacity style={styles.button} onPress={editText}>
        <Text>{enabled ? doneIcon : editIcon}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AboutTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  input: {
    minHeight: 100,
    maxHeight: 150,
    padding: 5,
    backgroundColor: colorDefaults.bottomBorderColor,
    marginBottom: 20,
  },
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
