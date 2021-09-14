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

const PatientProfile = ({ navigation, route }) => {
  const passedUser = route?.params?.user;
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState(
    passedUser ? Patient.patientFirestoreFactory(passedUser) : {}
  );
  const [loading, setLoading] = useState(passedUser ? false : true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Patient Profile",
    });
  }, []);

  !passedUser &&
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
            <Tab.Screen name="Profile">
              {(props) => (
                <ProfileTab
                  {...props}
                  user={user}
                  setUser={setUser}
                  passedUser={passedUser}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Address">
              {(props) => (
                <AddressTab
                  {...props}
                  user={user}
                  setUser={setUser}
                  passedUser={passedUser}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Medical">
              {(props) => (
                <MedicalTab
                  {...props}
                  user={user}
                  setUser={setUser}
                  passedUser={passedUser}
                />
              )}
            </Tab.Screen>
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
