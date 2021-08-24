import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colorDefaults from "../../theme/colorDefaults";
import firestoreService from "../../firebase/firestoreService";
import { ScrollView } from "react-native-gesture-handler";

function AboutTab({ user, setUser }) {
  const [enabled, setEnabled] = useState(false);
  const [aboutText, setAbout] = useState(user.about);

  const save = async () => {
    firestoreService.updateAbout(user.id, aboutText);
  };

  function editText() {
    if (enabled) {
      save();
      let updatedUser = {
        ...user,
        about: aboutText,
      };
      setUser(updatedUser);
    }

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={425}
      >
        <ScrollView style={{ flex: 1 }} bounces={false}>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={3}
            editable={enabled}
            placeholder="Tell us a little bit about yourself."
            onChangeText={setAbout}
            value={aboutText}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={editText}>
            <Text>{enabled ? doneIcon : editIcon}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
