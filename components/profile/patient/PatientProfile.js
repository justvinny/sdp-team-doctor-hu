import React from "react";
import { useState } from "react";
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
import ProfileInformation from "../ProfileInformation";
import PatientAboutTab from "./PatientAboutTab";

const PatientProfile = () => {
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../../assets/icon.png")}
          />
          <Text style={styles.name}>John Doe</Text>
        </View>

        <PatientAboutTab />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PatientProfile;

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
