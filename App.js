import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffMenu from './components/staffMenu';
import Square from './components/square';

const Stack = createNativeStackNavigator();

export default function App() {
  // Temporary to test navigation
  const Home = ({ navigation }) => (
    <View style={styles.container} >
      <Text style={{ fontSize: 24, textAlign: "center", margin: 8 }}>Temporary Home Menu</Text>
      <Button onPress={() => navigation.navigate("Page")} title="Other Page" />
      <Button onPress={() => navigation.navigate("StaffMenu")} title="StaffMenu" />

      <Square/>
      
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
        <Stack.Screen component={StaffMenu} name="StaffMenu" />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
