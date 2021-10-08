import { StyleSheet } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";

export default StyleSheet.create({
  activeTab: {
    backgroundColor: colorDefaults.primary,
  },
  inactiveTab: {
    backgroundColor: colorDefaults.secondary,
  },
  tabText: {
    color: "white",
  },
  tabIndicatorStyle: {
    backgroundColor: "black",
  },
});
