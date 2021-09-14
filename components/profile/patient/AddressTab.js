import React, { useContext, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../AuthContext";

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
  }

  const renderView = () => (
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
        {
          user.id === authUserId
            ? <EditEnableButton
              editable={editable}
              setEditable={setEditable}
              saveChanges={updateFirebase}
            /> : <></>
        }
      </ScrollView>
    </TouchableWithoutFeedback>
  )
  return (
    <>
      {
        Platform.OS === "ios"
          ? <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={450}
          >
            {renderView()}
          </KeyboardAvoidingView>
          : <View>
            {renderView()}
          </View>
      }
    </>

  );
};

export default PatientAddressTab;

const styles = StyleSheet.create({});
