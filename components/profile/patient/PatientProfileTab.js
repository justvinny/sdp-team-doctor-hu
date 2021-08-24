import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import PatientAboutTab from "./PatientAboutTab";

const PatientProfileTab = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={425}
    >
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <PatientAboutTab />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PatientProfileTab;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colorDefaults.backDropColor,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profiles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
});
