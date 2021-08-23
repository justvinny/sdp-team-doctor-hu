import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colorDefaults from "../../theme/colorDefaults";
import ProfileTab from "./ProfileTab";
import AuthContext from "../AuthContext";
import firestoreService from "../../firebase/firestoreService";
import Staff from "../../models/Staff";
import AboutTab from "./AboutTab";
const Tab = createMaterialTopTabNavigator();

export default function StaffProfile({ navigation }) {
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Staff Profile",
    });
  }, []);

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const renderPage = () => {
    if (loading) {
      return <></>;
    }

    return (
      <>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/icon.png")}
          />
          <Text style={styles.name}>{Staff.getFullName(user.name)}</Text>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { color: "white" },
            tabBarStyle: { backgroundColor: colorDefaults.primary },
            tabBarIndicatorStyle: { backgroundColor: "black" },
          }}
        >
          <Tab.Screen name="Profile">
            {({ props }) => (
              <ProfileTab {...props} user={user} setUser={setUser} />
            )}
          </Tab.Screen>
          <Tab.Screen name="About">
            {({ props }) => (
              <AboutTab {...props} user={user} setUser={setUser} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </>
    );
  };

  return renderPage();
}

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
});
