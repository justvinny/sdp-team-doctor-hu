import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileInformation from "../ProfileInformation";

const PatientAboutTab = () => {
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  return (
    <View style={styles.profiles}>
      <ProfileInformation
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <ProfileInformation
        label="Middle Name"
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
      />
      <ProfileInformation
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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
});
