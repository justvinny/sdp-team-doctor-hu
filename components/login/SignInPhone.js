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
} from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import LoadingScreen from "../LoadingScreen";
import PhoneInput from "react-native-phone-number-input";
import auth from "@react-native-firebase/auth";
import { Button } from "react-native";

const SignInPhone = (navigation) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  function PhoneSignIn() {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState("");

    const [code, setCode] = useState("");

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    }

    async function confirmCode() {
      try {
        await confirm.confirm(code);
      } catch (error) {
        alert("Invalid code.");
      }
    }

    if (!confirm) {
      return (
        <Buttonn
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber(phoneNumber)}
        />
      );
    }

    return (
      <>
        <TextInput value={code} onChangeText={(text) => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  }

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
      <PhoneSignIn />
      <TouchableOpacity
        id="1"
        onPress={() => {
          formatPhoneNumber();
        }}
      >
        <Text>send sms verification</Text>
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
