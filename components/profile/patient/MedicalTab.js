import React, { useContext } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import SelectDropdown from "react-native-select-dropdown";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colorDefaults from "../../../theme/colorDefaults";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import { useState } from "react/cjs/react.development";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../AuthContext";
import { Input } from "react-native-elements";
import TextInputStyles from "../profilecomponents/TextInputStyles";

const PatientMedicalTab = ({ user }) => {
  const { authUserId } = useContext(AuthContext);
  const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const [bloodType, setBloodType] = useState(user.bloodType);
  const [birthdate, setBirthdate] = useState(user.birthDate);
  const [weight, setWeight] = useState(user.weight.toString());
  const [height, setHeight] = useState(user.height.toString());
  const [allergies, setAllergies] = useState(user ? user.getAllergies() : "");
  const [editable, setEditable] = useState(false);

  const updateFirebase = () => {
    firestoreService.updateBloodtype(user.id, bloodType);
    firestoreService.updateBirthDate(user.id, birthdate);
    firestoreService.updateWeight(user.id, weight);
    firestoreService.updateHeight(user.id, height);
    firestoreService.updateAllergies(user.id, allergies.split(", "));
  };

  const renderView = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        bounces={false}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {authUserId === user.id ? (
          <View style={styles.dropdownContainer}>
            <Text style={TextInputStyles.labelStyle}>Blood Type</Text>
            <SelectDropdown
              data={bloodTypes}
              onSelect={(selectedItem) => {
                setBloodType(selectedItem);
              }}
              buttonStyle={styles.dropdownButton}
              defaultButtonText={user.bloodType}
              disabled={!editable}
            />
          </View>
        ) : (
          <ProfileInformation
            label="Blood Type"
            value={bloodType}
            onChangeText={setBloodType}
            placeholder="Blood type"
            editable={editable}
          />
        )}

        <ProfileInformation
          label="Birthdate"
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="Birthdate"
          editable={editable}
        />
        <ProfileInformation
          label="Weight (kgs)"
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight"
          editable={editable}
          keyboardType="numeric"
        />
        <ProfileInformation
          label="Height (cms)"
          value={height}
          onChangeText={setHeight}
          placeholder="Height"
          editable={editable}
          keyboardType="numeric"
        />
        <Input
          label="Allergies"
          value={allergies}
          onChangeText={setAllergies}
          placeholder="Allergies"
          editable={editable}
          multiline={true}
          style={TextInputStyles.multiline}
          labelStyle={TextInputStyles.labelStyle}
          containerStyle={TextInputStyles.inputView}
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
    </TouchableWithoutFeedback>
  );
  return (
    <>
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={380}
        >
          {renderView()}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>{renderView()}</View>
      )}
    </>
  );
};

export default PatientMedicalTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
  },
  dropdownContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  dropdownButton: {
    width: 300,
    height: 40,
    borderBottomWidth: 0.5,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
});
