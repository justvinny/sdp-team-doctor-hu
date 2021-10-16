import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import TextInputStyles from "./styles/TextInputStyles";

function ProfileInformation({
  label,
  placeholder,
  value,
  onChangeText,
  editable,
  keyboardType,
}) {
  return (
    <View style={TextInputStyles.inputView}>
      <Input
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        containerStyle={TextInputStyles.input}
        keyboardType={keyboardType}
        label={label}
        labelStyle={TextInputStyles.labelStyle}
      />
    </View>
  );
}

export default ProfileInformation;
