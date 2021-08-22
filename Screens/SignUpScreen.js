import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableHighlight, Pressable } from 'react-native';

export default function SignUpScreen({ navigation }) {
    const hi = () => {
        alert("hi");
      }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
            <TextInput style={styles.input} placeholder={'First Name*'}></TextInput>
            <TextInput style={styles.input} placeholder={'Last Name*'}></TextInput>
            <TextInput style={styles.input} placeholder={'Email*'}></TextInput>
            <TextInput style={styles.input} placeholder={'Password*'} secureTextEntry={true}></TextInput>
            <TextInput style={styles.input} placeholder={'Repeat Password*'} secureTextEntry={true}></TextInput>
        </KeyboardAvoidingView>

        <TouchableHighlight onPress={hi} style={styles.buttonSignUp}>
        <View>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableHighlight>

      <Text style={styles.passwordCheckCharacter}>Has at least 8 characters</Text>
      <Text style={styles.passwordCheckNumber}>Has at least 1 number</Text>

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
    paddingTop: 40,
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
    top: 150,
   },

   signInNavigatorText: {
    color: '#9F9F9F',
   },
});
