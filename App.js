import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SearchUserScreenController from './components/search/SearchUserScreenController';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffProfile from './Screens/StaffProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  // Temporary to test navigation
  const Home = ({ navigation }) => (
    <View style={styles.container} >
      <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>Temporary Home Menu</Text>
      <Button onPress={() => navigation.navigate("Page")} title="Other Page" />
      <Button onPress={() => navigation.navigate("Search")} title="Search Page" />
      <Button onPress={() => navigation.navigate("StaffProfile")} title="Staff Page" />
    </View >
  )

  // Temporary to test navigation
  const Page = () => (
    <View style={styles.container}>
      <Text>Another Page.</Text>
    </View>
  )
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "grey"
          },
          headerTitleStyle: {
            color: "#fff"
          },
          headerTintColor: "#fff",
          headerShadowVisible: false,
          animation: "slide_from_left"
        }}
      >
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Page} name="Page" />
        <Stack.Screen component={StaffProfile} name="StaffProfile" />
        <Stack.Screen component={SearchUserScreenController} name="Search" />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
