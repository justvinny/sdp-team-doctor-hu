import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import SelectDropdown from "react-native-select-dropdown";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colorDefaults from "../../../theme/colorDefaults";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import { useState } from "react/cjs/react.development";
import firestoreService from "../../../firebase/firestoreService";

const PatientMedicalTab = ({ route }) => {
  const user = route?.params.user;
  const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const [bloodType, setBloodyType] = useState(user.bloodType);
  const [birthdate, setBirthdate] = useState(user.birthDate);
  const [weight, setWeight] = useState(user.weight.toString());
  const [height, setHeight] = useState(user.height.toString());
  const [allergies, setAllergies] = useState(user ? user.getAllergies() : "");
  const [editable, setEditable] = useState(false);

  function updateFirebase() {
    firestoreService.updateBloodtype(user.id, bloodType);
    firestoreService.updateBirthDate(user.id, birthdate);
    firestoreService.updateWeight(user.id, weight);
    firestoreService.updateHeight(user.id, height);
    firestoreService.updateAllergies(user.id, allergies.split(", "));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={380}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Blood Type</Text>
            <SelectDropdown
              data={bloodTypes}
              onSelect={(selectedItem) => {
                setBloodyType(selectedItem);
              }}
              buttonStyle={styles.dropdownButton}
              defaultButtonText={user.bloodType}
              disabled={!editable}
            />
          </View>

          <ProfileInformation
            label="Birthdate"
            value={birthdate}
            onChangeText={setBirthdate}
            placeholder="Birthdate"
            editable={editable}
          />
          <ProfileInformation
            label="Weight"
            value={weight}
            onChangeText={setWeight}
            placeholder="Weight"
            editable={editable}
            keyboardType="numeric"
          />
          <ProfileInformation
            label="Height"
            value={height}
            onChangeText={setHeight}
            placeholder="Height"
            editable={editable}
            keyboardType="numeric"
          />
          <ProfileInformation
            label="Allergies"
            value={allergies}
            onChangeText={setAllergies}
            placeholder="Allergies"
            editable={editable}
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

export default PatientMedicalTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
    textAlign: "right",
    width: 120,
  },
  dropdownContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    backgroundColor: colorDefaults.bottomBorderColor,
    borderRadius: 10,
  },
  dropdownButton: {
    width: 200,
    height: 40,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 5,
    backgroundColor: colorDefaults.bottomBorderColor,
  },
});
