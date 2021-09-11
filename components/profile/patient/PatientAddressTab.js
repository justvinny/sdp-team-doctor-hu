import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import EditEnableButton from "../profilecomponents/EditEnableButton";

const PatientAddressTab = () => {
  const [editable, setEditable] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <ProfileInformation label="Address" editable={editable} />
        <ProfileInformation label="City" editable={editable} />
        <ProfileInformation label="Postcode" editable={editable} />
      </ScrollView>
      <EditEnableButton editable={editable} setEditable={setEditable} />
    </KeyboardAvoidingView>
  );
};

export default PatientAddressTab;

const styles = StyleSheet.create({});
