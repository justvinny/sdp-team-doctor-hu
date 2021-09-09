import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Pressable,
  Switch,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";
import firestoreService from "../firebase/firestoreService";
import colorDefaults from "../theme/colorDefaults";
import LoadingScreen from "./LoadingScreen";

export default function SignUpScreen({ navigation }) {
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (password === repeatPassword) {
      setLoading(true);
      const id = await auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          setLoading(false);
          return authUser.user.uid
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message)
        });

      if (id) {
        firestoreService.createUser(id, first, middle, last, isStaff)
          .catch(error => alert(error));
      }
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.input}
              placeholder={"First Name*"}
              value={first}
              onChangeText={setFirst}
            />
            <TextInput
              style={styles.input}
              placeholder={"Middle Name"}
              value={middle}
              onChangeText={setMiddle}
            />
            <TextInput
              style={styles.input}
              placeholder={"Last Name*"}
              value={last}
              onChangeText={setLast}
            />
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
            <TextInput
              style={styles.input}
              placeholder={"Repeat Password*"}
              secureTextEntry={true}
              value={repeatPassword}
              onChangeText={setRepeatPassword}
            />
          </KeyboardAvoidingView>

          <View style={styles.passCheckContainer}>
            <Text style={styles.passwordCheckCharacter}>
              Has at least 8 characters
            </Text>
            <Text style={styles.passwordCheckNumber}>
              Has at least 1 number
            </Text>
          </View>

          <View style={styles.staffSwitch}>
            <Text style={styles.stafftext}>Are you staff?</Text>
            <Switch
              trackColor={{ false: "grey", true: colorDefaults.primary }}
              value={isStaff}
              onValueChange={setIsStaff}
            />
          </View>

          <TouchableHighlight onPress={signUp} style={styles.buttonSignUp}>
            <View>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableHighlight>

          <Pressable
            style={styles.signInNavigator}
            onPress={() => navigation.navigate("Sign In")}
          >
            <Text style={styles.signInNavigatorText}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
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
    color: "#000000",
  },

  input: {
    backgroundColor: "#FFFFFF",
    height: 50,
    width: 380,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  buttonSignUp: {
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    alignSelf: "stretch",
    padding: 12,
    alignItems: "center",
    borderRadius: 20,
    margin: 8,
  },

  buttonText: {
    color: "white",
  },

  passCheckContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },

  passwordCheckCharacter: {
    color: "#9F9F9F",
    fontSize: 13,
  },

  passwordCheckNumber: {
    color: colorDefaults.subText,
    fontSize: 13,
  },

  signInNavigator: {
    margin: 8,
  },

  signInNavigatorText: {
    color: colorDefaults.subText,
  },

  staffSwitch: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    margin: 8,
    justifyContent: "center",
  },

  stafftext: {
    color: colorDefaults.subText,
    marginRight: 8,
  },
});
