import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import authService from './firebase/authService';

export default function App() {
  
  return (
    <View style={styles.container}>
      <Text>Vinson created this repository.</Text>
      <Button onPress={authService.signIn("test@test.co.nz", "123456")} title="Sign-up" />
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
