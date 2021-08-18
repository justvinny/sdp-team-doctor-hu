import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

function ProfileInformation({label, placeholder, value, onChangeText, editable})
{
  return (
    <View style={styles.inputView}>  
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        editable={editable}
        style={styles.input}
      />
    </View>
  );
}

export default function StaffProfile() {
  const[firstName, setFirstName] = useState('');
  const[middleName, setMiddleName] = useState('');
  const[lastName, setLastName] = useState('');
  const[enabled, setEnabled] = useState(false);

  const doneIcon = (
    <View style={{flexDirection: 'row'}}>
      <MaterialIcons name="done" size={24} color="black" style={{ marginRight: 5 }}/>
      <Text>Done</Text>
    </View>
  );

  const editIcon = (
    <View style={{ flexDirection: 'row', padding: 2}}>
      <MaterialIcons name="edit" size={24} color="black" style={{ marginRight: 5 }}/>
      <Text>Edit</Text>
    </View>
  )

  function editText() {
    enabled ? setEnabled(false) : setEnabled(true);
  }

  return (
    <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />

          <TouchableOpacity style={styles.button} onPress={editText}>
            <Text>{enabled ? doneIcon : editIcon}</Text>
          </TouchableOpacity>

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
      flexDirection: 'column',
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
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      borderRadius: 10,
    }
  });