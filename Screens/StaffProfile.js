import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function ProfileInformation({label, placeholder, value, onChangeText, editable})
{
  return (
    <View style={styles.inputView}>  
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
        editable={editable}
      />
    </View>
  );
}

export default function StaffProfile() {
  const[firstName, setFirstName] = useState('');
  const[middleName, setMiddleName] = useState('');
  const[lastName, setLastName] = useState('');
  const[enabled, setEnabled] = useState(false);

  function editText() {
    enabled ? setEnabled(false) : setEnabled(true);
  }

  return (
    <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />

          <Button title={enabled? "Done" : "Edit Details"} onPress={editText}/>
          <Pressable onPress={editText}>
            <Text>{enabled ? "Done" : "Edit Details"}</Text>
          </Pressable>
          <ProfileInformation
          label="First Name:"
          placeholder="First Name" 
          value={firstName}
          onChangeText={setFirstName}
          editable={enabled}/>
          <ProfileInformation
          label="Middle Name:"
          placeholder="Middle Name"
          value={middleName}
          onChangeText={setMiddleName}
          editable={enabled}/>
          <ProfileInformation
          label="Last Name:"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          editable={enabled}/>
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
      width: 200,
    },
    text: {
      marginRight: 10,
      textAlign: 'right',
    },
    inputView: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    }
  });