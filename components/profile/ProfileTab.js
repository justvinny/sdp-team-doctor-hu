import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colorDefaults from "../../theme/colorDefaults";
import ProfileInformation from "./ProfileInformation";
import firestoreService from "../../firebase/firestoreService";
import { ScrollView } from "react-native-gesture-handler";

function ProfileTab({ user, setUser }) {
  const [firstName, setFirstName] = useState(user.name.first);
  const [middleName, setMiddleName] = useState(user.name.middle);
  const [lastName, setLastName] = useState(user.name.last);
  const [enabled, setEnabled] = useState(false);

  const save = async () => {
    firestoreService.updateFirstName(user.id, firstName);
    firestoreService.updateMiddleName(user.id, middleName);
    firestoreService.updateLastName(user.id, lastName);
  };

  function editText() {
    if (enabled) {
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={370}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }} bounces={false}>
          <View style={styles.profiles}>
            <ProfileInformation
              label="First Name:"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              editable={enabled}
            />
            <ProfileInformation
              label="Middle Name:"
              placeholder="Middle Name"
              value={middleName}
              onChangeText={setMiddleName}
              editable={enabled}
            />
            <ProfileInformation
              label="Last Name:"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              editable={enabled}
            />
            <TouchableOpacity style={styles.button} onPress={editText}>
              <Text>{enabled ? doneIcon : editIcon}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profiles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
  button: {
    backgroundColor: colorDefaults.bottomBorderColor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
