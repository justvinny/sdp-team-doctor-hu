import { StyleSheet } from "react-native";
import colorDefaults from "../../../../theme/colorDefaults";

export default StyleSheet.create({
  input: {
    padding: 5,
    width: 300,
    height: 40,
    marginBottom: 10,
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: colorDefaults.primary,
  },
  inputView: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
  },
  multiline: {
    width: 300,
    height: 100,
    marginBottom: 5,
    alignItems: "center",
  },
});
