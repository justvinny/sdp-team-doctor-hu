import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import colorDefaults from "../../../theme/colorDefaults";
import EditEnableButton from "../profilecomponents/EditEnableButton";

const PatientAboutTab = () => {
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  const [editable, setEditable] = useState(false);

  return (
    <View style={styles.profiles}>
      <ProfileInformation
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        editable={editable}
      />
      <ProfileInformation
        label="Middle Name"
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
        editable={editable}
      />
      <ProfileInformation
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        editable={editable}
      />

      <EditEnableButton editable={editable} setEditable={setEditable} />
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
