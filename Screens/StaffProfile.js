import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function ProfileInformation({label, placeholder, value, onChangeText})
{
  return (
    <View style={styles.inputView}>  
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

export default function StaffProfile() {
  const[firstName, setFirstName] = useState('');
  const[middleName, setMiddleName] = useState('');
  const[lastName, setLastName] = useState('');
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <ProfileInformation
          label="First Name:"
          placeholder="First Name" 
          value={firstName}
          onChangeText={setFirstName}/>
          <ProfileInformation
          label="Middle Name:"
          placeholder="Middle Name"
          value={middleName}
          onChangeText={setMiddleName}/>
          <ProfileInformation
          label="Last Name:"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}/>
        </View>
    </SafeAreaProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderColor: 'black',
      borderWidth: 0.5,
      padding: 5,
    },
    text: {
      marginRight: 10,
    },
    inputView: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    }
  });