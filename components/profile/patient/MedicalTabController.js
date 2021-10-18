import React, { useContext, useState } from "react";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";
import MedicalTabView from "./MedicalTabView";

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

  return (
    <MedicalTabView
      user={user}
      authUserId={authUserId}
      editable={editable}
      bloodTypes={bloodTypes}
      bloodType={bloodType}
      setBloodType={setBloodType}
      birthdate={birthdate}
      setBirthdate={setBirthdate}
      weightTitle={weightTitle}
      weight={weight}
      setWeight={setWeight}
      heightTitle={heightTitle}
      height={height}
      setHeight={setHeight}
      allergies={allergies}
      setAllergies={setAllergies}
      measurementSystem={measurementSystem}
      imperial={imperial}
      setEditable={setEditable}
      updateFirebase={updateFirebase}
      setImperial={setImperial}
      setMeasurementSystem={setMeasurementSystem}
      setWeightTitle={setWeightTitle}
      setHeightTitle={setHeightTitle}
      convertWeight={convertWeight}
      convertHeight={convertHeight}
    />
  );
};

export default PatientMedicalTab;
