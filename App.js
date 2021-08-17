import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import authService from './firebase/authService';
import firestoreService from './firebase/firestoreService';

export default function App() {
  const click = () => {
    authService.signUp("test2@test2.co.nz", "123456", "Jada", "Gay", "Dude", false)
      .then((msg) => alert(msg));
  }

  return (
    <View style={styles.container}>
      <Text>Vinson created this repository.</Text>
      <Button onPress={click} title="Sign-up" />
      <StatusBar style="auto" />
    </View>
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
