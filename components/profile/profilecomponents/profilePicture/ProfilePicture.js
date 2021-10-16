import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import Staff from "../../../../models/Staff";
import colorDefaults from "../../../../theme/colorDefaults";

const ProfilePicture = ({
  profilePicture,
  passedUser,
  setSheetVisible,
  user,
}) => {
  return (
    <View style={styles.container}>
      {profilePicture ? (
        <Avatar
          size={150}
          rounded
          containerStyle={styles.avatarStyles}
          source={{ uri: profilePicture }}
          onPress={() => {
            !passedUser ? setSheetVisible(true) : {};
          }}
        />
      ) : (
        <Avatar
          size={150}
          title={`${user.name.first.charAt(0)}${user.name.last.charAt(0)}`}
          rounded
          containerStyle={styles.avatarStyles}
          onPress={() => {
            !passedUser ? setSheetVisible(true) : {};
          }}
        />
      )}

      <Text style={styles.name}>{Staff.getFullName(user.name)}</Text>
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarStyles: {
    backgroundColor: colorDefaults.primary,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
