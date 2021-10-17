import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import SelectDropdown from "react-native-select-dropdown";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import { Input } from "react-native-elements";
import TextInputStyles from "../profilecomponents/styles/TextInputStyles";
import { Switch } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";

const MedicalTabView = ({
  user,
  authUserId,
  editable,
  bloodTypes,
  bloodType,
  setBloodType,
  birthdate,
  setBirthdate,
  weightTitle,
  weight,
  setWeight,
  heightTitle,
  height,
  setHeight,
  allergies,
  setAllergies,
  measurementSystem,
  imperial,
  setEditable,
  updateFirebase,
  setImperial,
  setMeasurementSystem,
  setWeightTitle,
  setHeightTitle,
  convertWeight,
  convertHeight,
}) => {
  const renderView = () => (
    <>
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
        label={weightTitle}
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight"
        editable={editable}
        keyboardType="numeric"
      />
      <ProfileInformation
        label={heightTitle}
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
      <View style={{ alignItems: "center" }}>
        <Text>{measurementSystem}</Text>
        <Switch
          trackColor={{ false: "grey", true: colorDefaults.primary }}
          value={imperial}
          onValueChange={() => {
            if (imperial) {
              setImperial(false);
              setMeasurementSystem("Metric");
              setWeightTitle("Weight (kgs)");
              setHeightTitle("Height (cms)");
            } else {
              setImperial(true);
              setMeasurementSystem("Imperial");
              setWeightTitle("Weight (lbs)");
              setHeightTitle("Height (ft)");
            }
            convertWeight();
            convertHeight();
          }}
        />
      </View>

      {user.id === authUserId ? (
        <EditEnableButton
          editable={editable}
          setEditable={setEditable}
          saveChanges={updateFirebase}
        />
      ) : (
        <></>
      )}
    </>
  );
  return renderView();
};

export default MedicalTabView;

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
