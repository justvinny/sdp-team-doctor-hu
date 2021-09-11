import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import ProfileInformation from "../ProfileInformation";
import EditEnableButton from "../button/EditEnableButton";

const PatientAddressTab = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <ProfileInformation label="Address" />
        <ProfileInformation label="City" />
        <ProfileInformation label="Postcode" />
      </ScrollView>
      <EditEnableButton />
    </KeyboardAvoidingView>
  );
};

export default PatientAddressTab;

const styles = StyleSheet.create({});
