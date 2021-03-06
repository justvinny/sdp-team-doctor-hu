import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Platform
} from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import { auth } from "../../firebase/firebaseConfig";
import LoadingScreen from "../LoadingScreen";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        alert("Successfully sent password reset email.")
      })
      .catch((error) => alert(error.message));
  }

  return (

    <>
      {
        loading
          ? <LoadingScreen />
          : <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={200}
          >
            <ScrollView style={{ flex: 1 }}>
              <View style={[styles.container, { paddingTop: 50 }]}>
                <Image
                  source={require("../../assets/images/logo.png")}
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

                <TouchableHighlight onPress={resetPassword} style={styles.buttonReset}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
      }
    </>

  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "center"
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
