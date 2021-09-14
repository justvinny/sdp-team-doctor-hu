import React, { useContext } from "react";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import firestoreService from "../../../firebase/firestoreService";
import { ScrollView } from "react-native-gesture-handler";
import AuthContext from "../../AuthContext";
import EditEnableButton from "../profilecomponents/EditEnableButton";
import ProfileInformation from "../profilecomponents/ProfileInformation";
import { Input } from "react-native-elements/dist/input/Input";
import TextInputStyles from "../profilecomponents/TextInputStyles";

function AboutTab({ user, setUser }) {
  const { authUserId } = useContext(AuthContext);
  const [enabled, setEnabled] = useState(false);
  const [aboutText, setAbout] = useState(user.about);

  const save = async () => {
    firestoreService.updateAbout(user.id, aboutText);
  };

  function editText() {
    if (enabled) {
      save();
      let updatedUser = {
        ...user,
        about: aboutText,
      };
      setUser(updatedUser);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <Input
            style={TextInputStyles.multiline}
            labelStyle={TextInputStyles.labelStyle}
            containerStyle={TextInputStyles.inputView}
            multiline
            editable={enabled}
            placeholder="Tell us a little bit about yourself."
            onChangeText={setAbout}
            value={aboutText}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default AboutTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  input: {
    minHeight: 100,
    maxHeight: 150,
    padding: 5,
    backgroundColor: colorDefaults.bottomBorderColor,
    marginBottom: 20,
  },
});
