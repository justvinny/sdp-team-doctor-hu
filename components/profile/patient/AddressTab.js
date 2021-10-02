import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";

const PatientAddressTab = ({ user }) => {
  const [editable, setEditable] = useState(false);
  const [address, setAddress] = useState(user.address.street);
  const [suburb, setSuburb] = useState(user.address.suburb);
  const [city, setCity] = useState(user.address.city);
  const [postcode, setPostcode] = useState(user.address.post);

  const { authUserId } = useContext(AuthContext);

  const updateFirebase = () => {
    firestoreService.updateStreet(user.id, address);
    firestoreService.updateSuburb(user.id, suburb);
    firestoreService.updateCity(user.id, city);
    firestoreService.updatePost(user.id, postcode);
  };

  const renderView = () => (
    <ScrollView style={{ flex: 1 }}>
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
      {user.id === authUserId ? (
        <EditEnableButton
          editable={editable}
          setEditable={setEditable}
          saveChanges={updateFirebase}
        />
      ) : (
        <></>
      )}
    </ScrollView>
  );

  return renderView();
};

export default PatientAddressTab;

const styles = StyleSheet.create({});
