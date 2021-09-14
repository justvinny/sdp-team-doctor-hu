import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView
} from "react-native";
import colorDefaults from "../theme/colorDefaults";
import LoadingScreen from "./LoadingScreen";
import firebase from "firebase/app";
import { auth } from "../firebase/firebaseConfig";

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = () => {
    if (newPassword === passwordConfirmation) {
      setLoading(true);
      reauthenticate(currentPassword)
        .then(() => {
          const user = auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              alert("Password changed!");
            })
            .catch((error) => {
              alert(error.message);
            })
            .finally(() => setLoading(false));
        })
        .catch((error) => {
          alert("Incorrect Password!");
          setLoading(false);
        });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <>
      {
        loading
          ? <LoadingScreen />
          : <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

              <Text style={styles.headerText}>Forgot Your Password?</Text>
              <Text style={styles.headerDescription}>Change your password here!</Text>
              <View style={{ marginTop: 10 }}></View>

              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder={"Enter current password*"}
                onChangeText={setCurrentPassword}
              />

              <Text style={styles.conditionHeader}>
                Please ensure your new password:
              </Text>
              <Text style={styles.passwordCondition}>
                {" "}
                - Contains at least 6 characters
              </Text>
              <Text style={styles.passwordCondition}>
                {" "}
                - Contains at least 1 number
              </Text>

              <View style={{ marginTop: 10 }}></View>

              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder={"Enter new password*"}
                onChangeText={setnewPassword}
              />

              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder={"Confirm new password*"}
                onChangeText={setPasswordConfirmation}
              />

              <TouchableHighlight onPress={changePassword} style={styles.buttonReset}>
                <Text style={styles.buttonText}>Change Password</Text>
              </TouchableHighlight>
            </ScrollView>
          </View>
      }
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    justifyContent: "center",
    alignItems: "center"
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 22,
    color: "black",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "white",
    margin: 8,
    marginTop: 8,
    padding: 8,
    marginBottom: 20,
    width: "95%",
  },

  buttonReset: {
    marginTop: 30,
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

  headerDescription: {
    color: colorDefaults.subText,
    fontSize: 20,
    marginBottom: 40,
  },

  conditionHeader: {
    color: colorDefaults.subText,
    fontSize: 16,
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 20,
  },

  passwordCondition: {
    alignSelf: "flex-start",
    color: colorDefaults.subText,
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 20,
  },
});
