import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SearchUserScreen from './components/search/SearchUserScreen';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  // Temporary to test navigation
  const Home = ({ navigation }) => (
    <View style={styles.container} >
      <Text>Vinson created this repository.</Text>
      <Button onPress={() => navigation.navigate("Page")} title="Other Page" />
      <Button onPress={() => navigation.navigate("Search")} title="Search Page" />
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
            backgroundColor: "orange",
          }
        }}
      >
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={Page} name="Page" />
        <Stack.Screen component={SearchUserScreen} name="Search" />
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
