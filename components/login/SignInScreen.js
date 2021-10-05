import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import colorDefaults from "../../theme/colorDefaults";
import LoadingScreen from "../LoadingScreen";

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Sample account to login
  // email : test1@.co.nz
  // pass : 123456
  const signIn = async () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.headerText}>Sign In</Text>
          <Text style={styles.headerDescription}>
            Please enter your login details.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Email*"}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={"Password*"}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableHighlight onPress={signIn} style={styles.buttonSignIn}>
            <View>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonForgot}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <View>
              <Text style={styles.buttonText}>Forgot Password</Text>
            </View>
          </TouchableHighlight>

          <Pressable
            style={styles.signUpNavigator}
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text style={styles.signUpNavigatorText}>New? Sign up here.</Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "center",
    paddingTop: 100,
  },

  headerText: {
    fontSize: 20,
    color: "black",
  },

  headerDescription: {
    color: colorDefaults.subText,
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8,
  },

  inputContainer: {
    width: "100%",
    alignItems: "stretch",
  },

  input: {
    backgroundColor: "white",
    margin: 8,
    marginTop: 8,
    padding: 8,
  },

  buttonSignIn: {
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    width: 380,
    height: 43,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    margin: 8,
  },

  buttonForgot: {
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    width: 250,
    height: 43,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    margin: 8,
  },

  buttonText: {
    color: "white",
  },

  signUpNavigator: {
    margin: 8,
  },

  signUpNavigatorText: {
    color: colorDefaults.subText,
  },
});
