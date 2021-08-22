import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableHighlight, Pressable } from 'react-native';
import colorDefaults from '../theme/colorDefaults';

export default function SignUpScreen({ navigation }) {
  const hi = () => {
    alert("hi");
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInput style={styles.input} placeholder={'First Name*'}></TextInput>
        <TextInput style={styles.input} placeholder={'Last Name*'}></TextInput>
        <TextInput style={styles.input} placeholder={'Email*'}></TextInput>
        <TextInput style={styles.input} placeholder={'Password*'} secureTextEntry={true}></TextInput>
        <TextInput style={styles.input} placeholder={'Repeat Password*'} secureTextEntry={true}></TextInput>
      </KeyboardAvoidingView>

      <View style={styles.passCheckContainer}>
        <Text style={styles.passwordCheckCharacter}>Has at least 8 characters</Text>
        <Text style={styles.passwordCheckNumber}>Has at least 1 number</Text>
      </View>

      <TouchableHighlight onPress={hi} style={styles.buttonSignUp}>
        <View>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableHighlight>

      <Pressable style={styles.signInNavigator} onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.signInNavigatorText} >Already have an account? Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE1E7',
    alignItems: 'center',
    paddingTop: 100,
  },

  headerText: {
    fontSize: 20,
    color: '#000000'
  },

  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 380,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  buttonSignUp: {
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    alignSelf: "stretch",
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
    margin: 8
  },

  buttonText: {
    color: '#FFFFFF',
  },

  passCheckContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8
  },

  passwordCheckCharacter: {
    color: '#9F9F9F',
    fontSize: 13,
  },

  passwordCheckNumber: {
    color: '#9F9F9F',
    fontSize: 13,
  },

  signInNavigator: {
    margin: 8
  },

  signInNavigatorText: {
    color: '#9F9F9F',
  },
});
