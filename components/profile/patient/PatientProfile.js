import React from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import ProfileInformation from "../ProfileInformation";

const PatientAbout = () => {
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PatientAbout;

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
