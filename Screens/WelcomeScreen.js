import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View , Image} from 'react-native';

export default function WelcomeScreen() {
  const hi = () => {
    alert("hi");
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}></View>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode={'contain'}/>

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
    backgroundColor: '#DFE1E7',
    alignItems: 'center',
  },

  headerBar: {
    width: '100%',
    height: 40,
    backgroundColor: '#38B6FF',
  },

  logo: {
    top: 100,
  },

  buttonSignIn: {
    borderRadius: 20,
    backgroundColor: '#38B6FF',
    width: 380,
    height: 43,
    padding: 10,
    top: 250,
    alignItems: 'center',
   },

   buttonSignUp: {
    borderRadius: 20,
    backgroundColor: '#38B6FF',
    width: 380,
    height: 43,
    padding: 10,
    top: 270,
    alignItems: 'center',
   },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  or: {
    fontSize: 14,
    color: '#9F9F9F',
    top: 260,
  }
});
