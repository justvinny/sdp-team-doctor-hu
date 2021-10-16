import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Staff from "../../models/Staff";

const SearchUserCard = ({ navigation, user, type, ...props }) => {
  const fullName = Staff.getFullName(user.name);

  const getSearchType = () => {
    switch (type) {
      case "chat":
        return (
          <AntDesign name="message1" size={24} color={colorDefaults.primary} />
        );
      default:
        return (
          <MaterialIcons
            name="person-search"
            size={24}
            color={colorDefaults.primary}
          />
        );
    }
  };

  const getAction = () => {
    switch (type) {
      case "chat":
        navigation.replace("DirectMessage", { user });
        1;
        break;
      default:
        if (user.isStaff)
          navigation.navigate("StaffProfileController", { user });
        else navigation.navigate("PatientProfileController", { user });
    }
  };

  return (
    <TouchableOpacity
      testID={
        type === "chat"
          ? "SearchUserCard.ChatIcon"
          : "SearchUserCard.PersonIcon"
      }
      style={styles.container}
      activeOpacity={0.5}
      onPress={getAction}
    >
      <Text>{fullName}</Text>
      {getSearchType()}
    </TouchableOpacity>
  );
};

export default SearchUserCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colorDefaults.bottomBorderColor,
  },
});
