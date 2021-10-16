import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Staff from "../../../models/Staff";

const ProfilePicture = ({
  profilePicture,
  passedUser,
  setSheetVisible,
  user,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: profilePicture }}
        PlaceholderContent={<ActivityIndicator />}
        onPress={() => {
          !passedUser ? setSheetVisible(true) : {};
        }}
      />
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
