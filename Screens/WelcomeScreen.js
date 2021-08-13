import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function WelcomeScreen() {
  const hi = () => {
    alert("hi");
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}></View>
      <Text style= {styles.header}>Welcome to Patient App</Text>

      <TouchableHighlight onPress={hi} style={styles.buttonSignIn}>
        <View>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableHighlight>

      <Text style={styles.or}>Or</Text>

      <TouchableHighlight onPress={hi} style={styles.buttonSignUp}>
        <View>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F8',
    alignItems: 'center',
  },

  headerBar: {
    width: '100%',
    height: 40,
    backgroundColor: '#69718A',
  },

  header: {
    fontWeight: 'bold',
    color: '#575A68',
    top: 200,
    fontSize: 18,
  },

  buttonSignIn: {
    borderRadius: 20,
    backgroundColor: '#69718A',
    width: 380,
    height: 43,
    padding: 10,
    top: 300,
    alignItems: 'center',
   },

   buttonSignUp: {
    borderRadius: 20,
    backgroundColor: '#69718A',
    width: 380,
    height: 43,
    padding: 10,
    top: 350,
    alignItems: 'center',
   },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  or: {
    fontSize: 14,
    color: '#C6C8D2',
    top: 325,

  }
});
