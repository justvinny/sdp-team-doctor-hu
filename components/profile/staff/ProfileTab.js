import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Platform,
} from "react-native";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import firestoreService from "../../../firebase/firestoreService";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "../../AuthContext";
import EditEnableButton from "../profilecomponents/EditEnableButton";

function ProfileTab({ user, setUser }) {
  const { authUserId } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user.name.first);
  const [middleName, setMiddleName] = useState(user.name.middle);
  const [lastName, setLastName] = useState(user.name.last);
  const [enabled, setEnabled] = useState(false);

  const save = async () => {
    firestoreService.updateFirstName(user.id, firstName);
    firestoreService.updateMiddleName(user.id, middleName);
    firestoreService.updateLastName(user.id, lastName);
  };

  function editText() {
    if (enabled) {
      save();
      let updatedUser = {
        ...user,
        name: {
          first: firstName,
          middle: middleName,
          last: lastName,
        },
      };
      setUser(updatedUser);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={370}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }} bounces={false}>
          <View style={styles.profiles}>
            <ProfileInformation
              label="First Name:"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              editable={enabled}
            />
            <ProfileInformation
              label="Middle Name:"
              placeholder="Middle Name"
              value={middleName}
              onChangeText={setMiddleName}
              editable={enabled}
            />
            <ProfileInformation
              label="Last Name:"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              editable={enabled}
            />
            {authUserId === user.id ? (
              <EditEnableButton
                editable={enabled}
                setEditable={setEnabled}
                saveChanges={editText}
              />
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default ProfileTab;

const styles = StyleSheet.create({
  profiles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
});
