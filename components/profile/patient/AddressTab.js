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
import firestoreService from "../../../firebase/firestoreService";

const PatientAddressTab = ({ route }) => {
  const user = route?.params.user;
  const [editable, setEditable] = useState(false);
  const [address, setAddress] = useState(user.address.street);
  const [suburb, setSuburb] = useState(user.address.suburb);
  const [city, setCity] = useState(user.address.city);
  const [postcode, setPostcode] = useState(user.address.post);

  function updateFirebase() {
    firestoreService.updateStreet(user.id, address);
    firestoreService.updateSuburb(user.id, suburb);
    firestoreService.updateCity(user.id, city);
    firestoreService.updatePost(user.id, postcode);
  }

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
            keyboardType="number-pad"
          />
          <EditEnableButton
            editable={editable}
            setEditable={setEditable}
            saveChanges={updateFirebase}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PatientAddressTab;

const styles = StyleSheet.create({});
