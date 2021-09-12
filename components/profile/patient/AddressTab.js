import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import EditEnableButton from "../profilecomponents/EditEnableButton";

const PatientAddressTab = () => {
  const [editable, setEditable] = useState(false);

  function editText(params) {}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={450}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ProfileInformation label="Address" editable={editable} />
          <ProfileInformation label="City" editable={editable} />
          <ProfileInformation label="Postcode" editable={editable} />
          <EditEnableButton
            editable={editable}
            setEditable={setEditable}
            saveChanges={editText}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PatientAddressTab;

const styles = StyleSheet.create({});
