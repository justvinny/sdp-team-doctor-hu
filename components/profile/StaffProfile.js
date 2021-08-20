import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import colorDefaults from '../../theme/colorDefaults';
import ProfileTab from './ProfileTab';

const Tab = createMaterialTopTabNavigator();

function AboutScreen() {
  return (
    <View>
      <Text>Hello Second Tab</Text>
    </View>
  )
}

export default function StaffProfile() {


  return (
    <>
      <Image style={styles.image} source={require('../../assets/icon.png')} />
      <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { color: 'white' },
        tabBarStyle: { backgroundColor: colorDefaults.primary},
        tabBarIndicatorStyle: { backgroundColor: 'black' }
      }}>
        <Tab.Screen name="Profile" component={ProfileTab} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: "center"
  }
});