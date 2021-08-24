import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const PatientMedicalTab = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [bloodType, setBloodType] = useState([
    { label: "A+", value: "A+" },
    { label: "O+", value: "O+" },
    { label: "B+", value: "B+" },
    { label: "AB+", value: "AB+" },
    { label: "A-", value: "A-" },
    { label: "O-", value: "O-" },
    { label: "B-", value: "B-" },
    { label: "AB-", value: "AB-" },
  ]);

  return (
    <View style={styles.container}>
      <Text>Blood Type</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={bloodType}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setBloodType}
        containerStyle={{ width: 100 }}
      />
    </View>
  );
};

export default PatientMedicalTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
});
