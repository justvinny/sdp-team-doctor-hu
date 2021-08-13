import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';

export default function SignUpScreen() {
    const hi = () => {
        alert("hi");
      }

  return (
    <View style={styles.container}>
        <View style={styles.headerBar}></View>
        <Text style={styles.headerBarText}>Sign Up</Text>
        <View style={styles.backIcon}></View>
        

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
            <TextInput style={styles.input} placeholder={'Email*'}></TextInput>
            <TextInput style={styles.input} placeholder={'Password*'}></TextInput>
            <TextInput style={styles.input} placeholder={'Repeat Password*'}></TextInput>
        </KeyboardAvoidingView>

        <TouchableHighlight onPress={hi} style={styles.buttonSignUp}>
        <View>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableHighlight>

      <Text style={styles.passwordCheckCharacter}>Has at least 8 characters</Text>
      <Text style={styles.passwordCheckNumber}>Has at least 1 number</Text>

      <Text style={styles.signInNavigator}>Already have an account? Sign in</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE1E7',
    alignItems: 'center',
  },

  headerBar: {
    width: '100%',
    height: 80,
    backgroundColor: '#38B6FF',
  },

  headerBarText: {
      fontSize: 18,
      color: '#FFFFFF',
      bottom: 35,

  },

  backIcon: {
      backgroundColor: '#FFFFFF',
      width:  25,
      height: 20,
      right: 180,
      bottom: 60,
  },

  headerText: {
    fontSize: 20,
    color: '#000000',
    top: 70,
  },

  input: {
      backgroundColor: '#FFFFFF',
      height: 50,
      width: 380,
      top: 100,
      paddingHorizontal: 10,
      marginBottom: 10,
  },

  buttonSignUp: {
    borderRadius: 20,
    backgroundColor: '#38B6FF',
    width: 380,
    height: 43,
    padding: 10,
    top: 150,
    alignItems: 'center',
    borderRadius: 20,
   },

   buttonText: {
       color:'#FFFFFF',
   },

   passwordCheckCharacter: {
    color: '#9F9F9F',
    top: 60,
    right: 80,
    fontSize: 13,
   },

   passwordCheckNumber: {
    color: '#9F9F9F',
    top: 42,
    left: 110,
    fontSize: 13,
   },

   signInNavigator: {
    color: '#9F9F9F',
    top: 150,
   },
});
