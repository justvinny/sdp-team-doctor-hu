import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableHighlight, Pressable } from 'react-native';

export default function SignUpScreen( {navigation} ) {
    const hi = () => {
        alert("hi");
      }

  return (
    <View style={styles.container}>
        <View style={styles.backIcon}></View>
        <Text style={styles.headerText}>Sign In</Text>
        <Text style={styles.headerDescription}>Please enter your login details.</Text>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
            <TextInput style={styles.input} placeholder={'Email*'}></TextInput>
            <TextInput style={styles.input} placeholder={'Password*'} secureTextEntry={true}></TextInput>
        </KeyboardAvoidingView>

        <TouchableHighlight onPress={hi} style={styles.buttonSignIn}>
        <View>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={hi} style={styles.buttonForgot}>
        <View>
          <Text style={styles.buttonText}>Forgot Password</Text>
        </View>
      </TouchableHighlight>

      <Pressable style={styles.signUpNavigator} onPress={() => navigation.navigate('Sign Up')}>
        <Text style={styles.signUpNavigatorText} >New? Sign up here.</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DFE1E7',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 20,
    color: '#000000',
    top: 70,
  },

  headerDescription: {
      color: '#9F9F9F',
      fontSize: 18,
      top: 100,
  },

  input: {
      backgroundColor: '#FFFFFF',
      height: 50,
      width: 380,
      top: 200,
      paddingHorizontal: 10,
      marginBottom: 10,
  },

  buttonSignIn: {
    borderRadius: 20,
    backgroundColor: '#38B6FF',
    width: 380,
    height: 43,
    padding: 10,
    top: 250,
    alignItems: 'center',
    borderRadius: 20,
   },

   buttonForgot: {
    borderRadius: 20,
    backgroundColor: '#38B6FF',
    width: 250,
    height: 43,
    padding: 10,
    top: 300,
    alignItems: 'center',
    borderRadius: 20,
   },

   buttonText: {
     color: "#FFFFFF",
   },

   signUpNavigator: {
    top: 350,
   },

   signUpNavigatorText: {
    color: '#9F9F9F',
   },
});
