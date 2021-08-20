import React, { useState } from 'react';
import { Button, StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colorDefaults from '../theme/colorDefaults';

const Tab = createBottomTabNavigator();

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

function ProfileScreen({ navigation }) {
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

function TextScreen() {
  return (
    <View style={{marginTop: 50}}>
      <Text>Hello Second Tab</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

export default function StaffProfile() {
  return (
    <>
      <Image style={styles.image} source={require('../assets/icon.png')} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: colorDefaults.primary,
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: colorDefaults.secondary,
          tabBarIcon: () => <></>,
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: "bold",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            textAlignVertical: "center"
          }
        }}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="About" component={TextScreen} />
      </Tab.Navigator>
    </>
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
    marginTop: 50
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: "center"
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
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 80,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});