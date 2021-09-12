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
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  function editText(params) {}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={450}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <ProfileInformation
            label="Address"
            value={address}
            editable={editable}
            placeholder="Address"
            onChangeText={setAddress}
          />
          <ProfileInformation
            label="Suburb"
            value={suburb}
            editable={editable}
            placeholder="Suburb"
            onChangeText={setSuburb}
          />
          <ProfileInformation
            label="City"
            value={city}
            editable={editable}
            placeholder="City"
            onChangeText={setCity}
          />
          <ProfileInformation
            label="Postcode"
            value={postcode}
            editable={editable}
            placeholder="Postcode"
            onChangeText={setPostcode}
          />
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
