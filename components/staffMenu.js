import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, Dimensions, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Square from './square';



export default function StaffMenu(){
    return(
        <View style={styles.container}>
      
        {/* <TouchableOpacity
        style = {{
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * 0.4,
          height: Dimensions.get('window').width * 0.4,
          backgroundColor:'#f00',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
        onPress = { () => alert('Yaay!') }
      >
        <Text> Mom, look, I am a circle! </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {{
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * 0.4,
          height: Dimensions.get('window').width * 0.4,
          backgroundColor:'#f00',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
        onPress = { () => alert('Yaay!') }
      >
        <Text> Mom, look, I am a circle! </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {{
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * 0.4,
          height: Dimensions.get('window').width * 0.4,
          backgroundColor:'#f00',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
        onPress = { () => alert('Yaay!') }
      >
        <Text> Mom, look, I am a circle! </Text>
      </TouchableOpacity> */}
      

      <Square/>

      <Square/>
      <Square/>
      <Square/>
      <Square/>
      <Square/>
      

      </View>

    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eef1fa',
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      flexWrap: "wrap",
      padding: 20,
    },
    item:{
      padding: 20,
    }
  });