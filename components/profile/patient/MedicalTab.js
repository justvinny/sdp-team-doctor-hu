import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import SelectDropdown from "react-native-select-dropdown";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";
import { Input } from "react-native-elements";
import TextInputStyles from "../profilecomponents/TextInputStyles";
import { Switch } from "react-native";

const PatientMedicalTab = ({ user }) => {
  const { authUserId } = useContext(AuthContext);
  const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const [bloodType, setBloodType] = useState(user.bloodType);
  const [birthdate, setBirthdate] = useState(user.birthDate);
  const [weight, setWeight] = useState(user.weight.toString());
  const [height, setHeight] = useState(user.height.toString());
  const [allergies, setAllergies] = useState(user ? user.getAllergies() : "");
  const [editable, setEditable] = useState(false);
  const [imperial, setImperial] = useState(false);
  const [measurementSystem, setMeasurementSystem] = useState("Metric");
  const [weightTitle, setWeightTitle] = useState("Weight (kgs)");
  const [heightTitle, setHeightTitle] = useState("Height (cms)");
  const [heightcm, setHeightCM] = useState("");

  const updateFirebase = () => {
    firestoreService.updateBloodtype(user.id, bloodType);
    firestoreService.updateBirthDate(user.id, birthdate);
    firestoreService.updateWeight(user.id, weight);
    firestoreService.updateHeight(user.id, height);
    firestoreService.updateAllergies(user.id, allergies.split(", "));
  };

  const convertWeight = () => {
    if (!imperial) {
      // covnert weight to imperial system
      let lbs = parseFloat(weight);
      lbs = lbs * 2.205;
      setWeight(lbs.toString());
    } else if (imperial) {
      //convert weight to metric system
      let kgs = parseFloat(weight);
      kgs = kgs / 2.205;
      setWeight(kgs.toString());
    }
  };

  const convertHeight = () => {
    if (!imperial) {
      // convert hieght to imperial system
      setHeightCM(height);
      let cms = parseFloat(height);
      let totalInches = cms / 2.54;
      let feet = Math.floor(totalInches / 12);
      let inches = totalInches - 12 * feet;
      let impheight = `${feet}"${Math.round(inches)}`;
      setHeight(impheight);
    } else if (imperial) {
      //convert weight to metric system
      let feet = parseFloat(height);
      let inch = parseFloat(height.substr(2));
      let totalFeet = inch / 12 + feet;
      let totalInches = totalFeet * 12;
      let cms = totalInches * 2.54;
      let cmHeight = `${Math.round(cms)}`;
      setHeight(cmHeight);
    }
  };

  const renderView = () => (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView height={400} width={"100%"} bounces={false}>
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
        <View>
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
      </ScrollView>
      {/* <View style={{ height: 100 }} /> */}
    </KeyboardAvoidingView>
  );
  return renderView();
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
