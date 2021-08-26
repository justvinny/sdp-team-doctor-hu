import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import colorDefaults from "../theme/colorDefaults";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode={"contain"}
      />

      <Text style={styles.headerText}>Forgot Your Password?</Text>
      <Text style={styles.headerDescription}>
        Enter your email below to reset your password!
      </Text>

      <TextInput
        style={styles.input}
        placeholder={"Email*"}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableHighlight onPress={alert("fu")} style={styles.buttonReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "center",
    paddingTop: 50,
  },

  input: {
    backgroundColor: "white",
    margin: 8,
    marginTop: 8,
    padding: 8,
    marginBottom: 20,
    width: "95%",
  },

  logo: {
    marginBottom: 50,
  },

  headerText: {
    fontSize: 20,
    color: "black",
    marginBottom: 10,
  },

  headerDescription: {
    color: colorDefaults.subText,
    fontSize: 18,
    marginBottom: 40,
  },

  buttonReset: {
    marginTop: 15,
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    width: 380,
    height: 43,
    padding: 10,
    alignItems: "center",
    margin: 8,
  },

  buttonText: {
    color: "white",
  },
});
