import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchUserScreenController from './components/search/SearchUserScreenController';
import ChatHomeScreen from './components/chat/ChatHomeScreen';
import colorDefaults from './theme/colorDefaults';

const Stack = createNativeStackNavigator();

export default function App() {
  // Temporary to test navigation
  const Home = ({ navigation }) => (
    <View style={styles.container} >
      <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>Temporary Home Menu</Text>
      <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Page")} title="Other Page" />
      <Button color={colorDefaults.primary} onPress={() => navigation.navigate("Search")} title="Search Page" />
      <Button color={colorDefaults.primary} onPress={() => navigation.navigate("ChatHome")} title="Message Staff" />
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
            backgroundColor: colorDefaults.primary
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
        <Stack.Screen component={SearchUserScreenController} name="Search" />
        <Stack.Screen component={ChatHomeScreen} name="ChatHome" />
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
