import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
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
import { auth, signInWithPhoneNumber } from "../../firebase/firebaseConfig";
import colorDefaults from "../../theme/colorDefaults";
import LoadingScreen from "../LoadingScreen";
import PhoneInput from "react-native-phone-number-input";
import firebase from "firebase/app";
import { firebase as fb } from "../../firebase/firebaseConfig";

const SignInPhone = (navigation) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhoneNumber = () => {
    alert(phoneNumber);
  };

  recaptcha = new firebase.auth.RecaptchaVerifier(
    "1",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        alert("captcha solved");
      },
    },
    auth
  );

  const signIn = () => {};

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode={"contain"}
      />

      <PhoneInput
        style={styles.phoneInput}
        placeholder={"Phone Number"}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity
        id="1"
        onPress={() => {
          formatPhoneNumber();
        }}
      >
        <Text>show</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "center",
    paddingTop: 50,
  },
});
