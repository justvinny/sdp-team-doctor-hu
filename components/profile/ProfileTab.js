import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colorDefaults from '../../theme/colorDefaults';
import ProfileInformation from './ProfileInformation';

function ProfileTab() {
  const [firstName, setFirstName] = useState('John');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('Doe');
  const [enabled, setEnabled] = useState(false);

  function editText() {
    enabled ? setEnabled(false) : setEnabled(true);
  };

  const ProfileName = (
    <View>
      <Text style={styles.name}>{firstName + " " + lastName}</Text>
    </View>
  );

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

  return (
    <View style={styles.container}>
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

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={editText}>
          <Text>{enabled ? doneIcon : editIcon}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfileTab;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colorDefaults.backDropColor,
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
    button: {
      alignItems: 'center',
      backgroundColor: colorDefaults.bottomBorderColor,
      padding: 10,
      borderRadius: 10,
      marginBottom: 80,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });