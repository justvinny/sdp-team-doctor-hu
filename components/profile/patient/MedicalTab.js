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

const PatientMedicalTab = () => {
  const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={360}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Blood Type</Text>
            <SelectDropdown
              data={bloodTypes}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonStyle={styles.dropdownButton}
              defaultButtonText="None Selected"
            />
          </View>

          <ProfileInformation label="Birthdate" />
          <ProfileInformation label="Weight" />
          <ProfileInformation label="Height" />
          <ProfileInformation label="Allergies" />
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
