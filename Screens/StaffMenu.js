import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, Dimensions, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function StaffMenu(){
    return(
        <View style={styles.container}>
        <Text>Catie created this Staff View.</Text>
        <StatusBar style="auto" />
      </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });