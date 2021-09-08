import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileInformation from "../ProfileInformation";
import SelectDropdown from "react-native-select-dropdown";

const PatientMedicalTab = () => {
  const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.label}>Blood Type</Text>
        <SelectDropdown
          data={bloodTypes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
        />
      </View>
      <ProfileInformation label="Birthdate" />
      <ProfileInformation label="Weight" />
      <ProfileInformation label="Height" />
      <ProfileInformation label="Allergies" />
    </View>
  );
};

export default PatientMedicalTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    paddingRight: 15,
  },
});
