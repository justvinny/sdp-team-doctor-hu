import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  // Temporary to test navigation
  const Home = ({ navigation }) => {
    const click = () => {
      navigation.navigate("Page")
    }

    return (
      <View style={styles.container} >
        <Text>Vinson created this repository.</Text>
        <Button onPress={click} title="Sign-up" />
      </View >
    )
  }

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
