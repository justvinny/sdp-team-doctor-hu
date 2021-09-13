import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PatientAboutTab from "./AboutTab";

const PatientProfileTab = ({ user, setUser }) => {
  const renderView = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <PatientAboutTab user={user} setUser={setUser} />
      </ScrollView>
    </TouchableWithoutFeedback>
  )

  return (
    <>
      {
        Platform.OS === "ios"
          ? <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={370}
          >
            {renderView()}
          </KeyboardAvoidingView>
          : <View style={{ flex: 1 }}>
            {renderView()}
          </View>
      }
    </>
  );
};

export default PatientProfileTab;
