import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ProfileInformation({ label, placeholder, value, onChangeText, editable }) {
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
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [enabled, setEnabled] = useState(false);

  const doneIcon = (
    <View style={styles.icon}>
      <MaterialIcons name="done" size={24} color="black" style={{ marginRight: 5 }} />
      <Text>Done</Text>
    </View>
  );

  const editIcon = (
    <View style={styles.icon}>
      <MaterialIcons name="edit" size={24} color="black" style={{ marginRight: 5 }} />
      <Text>Edit</Text>
    </View>
  );

  function editText() {
    enabled ? setEnabled(false) : setEnabled(true);
  };

  const ProfileName = (
    <View style={styles.name}>
      <Text>{firstName + " " + lastName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {ProfileName}

      <View style={styles.profiles}>
        <ProfileInformation
          label="First Name:"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          editable={enabled} />
        <ProfileInformation
          label="Middle Name:"
          placeholder="Middle Name"
          value={middleName}
          onChangeText={setMiddleName}
          editable={enabled} />
        <ProfileInformation
          label="Last Name:"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          editable={enabled} />
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={editText}>
          <Text>{enabled ? doneIcon : editIcon}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eef1fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profiles: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    width: 200,
    height: 40,
  },
  text: {
    marginRight: 10,
    textAlign: 'right',
    width: 120,
  },
  inputView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#d3d3d3',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 80,
  }
});