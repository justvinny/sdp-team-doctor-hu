import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";
import Patient from "../../../models/Patient";
import Staff from "../../../models/Staff";

const GlobalProfileTab = ({ user, setUser }) => {
  const [firstName, setFirstName] = useState(user.name.first);
  const [middleName, setMiddleName] = useState(user.name.middle);
  const [lastName, setLastName] = useState(user.name.last);
  const [editable, setEditable] = useState(false);
  const { authUserId } = useContext(AuthContext);

  function updateFirebase() {
    firestoreService.updateFirstName(user.id, firstName);
    firestoreService.updateMiddleName(user.id, middleName);
    firestoreService.updateLastName(user.id, lastName);

    const updatedUser = {
      ...user,
      name: {
        first: firstName,
        middle: middleName,
        last: lastName,
      },
    };
    if (!user.isStaff) {
      setUser(Patient.patientFirestoreFactory(updatedUser));
    } else {
      setUser(Staff.staffFirestoreFactory(updatedUser));
    }
  }

  return (
    <View style={styles.profiles}>
      <ProfileInformation
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        editable={editable}
      />
      <ProfileInformation
        label="Middle Name"
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
        editable={editable}
      />
      <ProfileInformation
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        editable={editable}
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
    </View>
  );
};

export default GlobalProfileTab;

const styles = StyleSheet.create({
  profiles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
});
