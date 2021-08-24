import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import PatientProfileTab from "./PatientProfileTab";
import PatientAddressTab from "./PatientAddressTab";
import PatientMedicalTab from "./PatientMedicalTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const PatientProfile = () => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/icon.png")}
        />
        <Text style={styles.name}>John Doe</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { color: "white" },
          tabBarStyle: { backgroundColor: colorDefaults.primary },
          tabBarIndicatorStyle: { backgroundColor: "black" },
        }}
      >
        <Tab.Screen name="Profile" component={PatientProfileTab} />
        <Tab.Screen name="Address" component={PatientAddressTab} />
        <Tab.Screen name="Medical" component={PatientMedicalTab} />
      </Tab.Navigator>
    </>
  );
};

export default PatientProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colorDefaults.backDropColor,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
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
  profiles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: 10,
  },
});
