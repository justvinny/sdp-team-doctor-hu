import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchUserScreenController from "./components/search/SearchUserScreenController";
import ChatHomeScreenController from "./components/chat/ChatHomeScreenController";
import colorDefaults from "./theme/colorDefaults";
import DirectMessageScreenController from "./components/chat/DirectMessageScreenController";
import AuthContext from "./context/AuthContext";
import { auth } from "./firebase/firebaseConfig";
import WelcomeScreen from "./components/login/WelcomeScreen";
import SignInScreen from "./components/login/SignInScreen";
import SignUpScreen from "./components/login/SignUpScreen";
import ResetPassword from "./components/login/ResetPassword";
import ChangePasswordScreen from "./components/settings/ChangePasswordScreen";
import StaffProfileController from "./components/profile/staff/StaffProfileController";
import PatientProfileController from "./components/profile/patient/PatientProfileController";
import Menu from "./components/mainmenu/Menu";
import ProfileSelection from "./components/profile/ProfileSelection";
import ViewFileScreen from "./components/documentUpload/ViewFileScreen";

import NotificationScreenController from "./components/notifications/NotificationScreenController";

const Stack = createNativeStackNavigator();

export default function App() {
  // Authentication states
  const [authUserId, setAuthUserId] = useState("");

  // Temporary to test navigation
  const Home = ({ navigation }) => {
    const signOut = () => {
      auth
        .signOut()
        .then(() => {
          setAuthUserId(undefined);
          navigation.replace("WelcomeScreen");
        })
        .catch((error) => alert(error));
    };

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>
          Temporary Home Menu
        </Text>
        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("Search")}
          title="Search Page"
        />
        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("ChatHome")}
          title="Message Staff"
        />
        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("StaffProfileController")}
          title="View Staff Profile"
        />
        <Button
          color={colorDefaults.primary}
          onPress={signOut}
          title="Sign Out"
        />

        <Button
          color={colorDefaults.primary}
          onPress={() => navigation.navigate("ViewFileScreen")}
          title="ViewFileScreen"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={{ authUserId, setAuthUserId }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
              headerStyle: {
                backgroundColor: colorDefaults.primary,
              },
              headerTitleStyle: {
                color: "#fff",
              },
              headerTintColor: "#fff",
              headerShadowVisible: false,
              animation: "slide_from_left",
            }}
          >
            <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
            <Stack.Screen component={SignInScreen} name="Sign In" />
            <Stack.Screen component={SignUpScreen} name="Sign Up" />
            <Stack.Screen component={ResetPassword} name="ResetPassword" />
            <Stack.Screen component={Menu} name="Menu" />
            <Stack.Screen
              component={SearchUserScreenController}
              name="Search"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              component={ChatHomeScreenController}
              name="ChatHome"
            />
            <Stack.Screen
              component={DirectMessageScreenController}
              name="DirectMessage"
            />
            <Stack.Screen
              component={StaffProfileController}
              name="StaffProfileController"
            />
            <Stack.Screen
              component={ChangePasswordScreen}
              name="ChangePassword"
            />
            <Stack.Screen
              component={PatientProfileController}
              name="PatientProfileController"
            />
            <Stack.Screen
              component={ProfileSelection}
              name="ProfileSelection"
            />

            <Stack.Screen component={ViewFileScreen} name="ViewFileScreen" />
            <Stack.Screen
              component={NotificationScreenController}
              name="NotificationScreen"
            />
          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
