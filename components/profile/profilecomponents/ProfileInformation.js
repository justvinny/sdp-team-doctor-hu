import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";

function ProfileInformation({
  label,
  placeholder,
  value,
  onChangeText,
  editable,
  keyboardType,
}) {
  return (
    <View style={styles.inputView}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        style={styles.input}
        keyboardType={keyboardType}
      />
    </View>
  );
}

export default ProfileInformation;

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    padding: 5,
    width: 200,
    height: 40,
  },
  text: {
    marginRight: 10,
    textAlign: "right",
    width: 120,
  },
  inputView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    backgroundColor: colorDefaults.bottomBorderColor,
    borderRadius: 10,
  },
});
