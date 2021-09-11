import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import { MaterialIcons } from "@expo/vector-icons";
import colorDefaults from "../../../theme/colorDefaults";

const PatientAboutTab = () => {
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  const [enabled, setEnabled] = useState(false);

  function editText() {
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
    <View style={styles.profiles}>
      <ProfileInformation
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        editable={enabled}
      />
      <ProfileInformation
        label="Middle Name"
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
        editable={enabled}
      />
      <ProfileInformation
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        editable={enabled}
      />
      <TouchableOpacity style={styles.button} onPress={editText}>
        <Text>{enabled ? doneIcon : editIcon}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatientAboutTab;

const styles = StyleSheet.create({
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
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
