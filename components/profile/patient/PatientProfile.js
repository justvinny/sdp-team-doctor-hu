import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import ProfileTab from "./ProfileTab";
import AddressTab from "./AddressTab";
import MedicalTab from "./MedicalTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../AuthContext";
import LoadingScreen from "../../../Screens/LoadingScreen";
import Patient from "../../../models/Patient";

const Tab = createMaterialTopTabNavigator();

const PatientProfile = ({ navigation }) => {
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Patient Profile",
    });
  }, []);

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(Patient.patientFirestoreFactory(data));
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../../assets/icon.png")}
            />
            <Text style={styles.name}>{user.getFullName()}</Text>
          </View>

          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: { color: "white" },
              tabBarStyle: { backgroundColor: colorDefaults.primary },
              tabBarIndicatorStyle: { backgroundColor: "black" },
            }}
          >
            <Tab.Screen name="Profile" component={ProfileTab} />
            <Tab.Screen name="Address" component={AddressTab} />
            <Tab.Screen
              name="Medical"
              component={MedicalTab}
              initialParams={{ user }}
            />
          </Tab.Navigator>
        </>
      )}
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
