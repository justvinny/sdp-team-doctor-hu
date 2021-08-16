import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import authService from './firebase/authService';
import firestoreService from './firebase/firestoreService';

export default function App() {
  const click = () => {
    firestoreService.getUserById("hcXH0dAlb94Hnh83R1DH")
      .then(data => console.log(data));
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
