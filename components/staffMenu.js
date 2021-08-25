import React, { useState } from "react";
import { Text, View, ScrollView, Button, Dimensions, StyleSheet, StatusBar, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Square from './square';
import LogoutButton from './logoutButton'


export default function StaffMenu(){

  const [names, setName] = useState(["Profile", "Messages", "Settings", "Attachments", "Notifications", "Search User"]);

   const textTest = [];
   for (let index = 0; index < textTest.length; index++) {
    console.log(textTest[index])

    
  }

    return(
      
        <View style={styles.container}>
          {
        names.map((name, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <Square 
                index={index + 1} 
                name={name} 
              />
            </View>
          );
        })
      }


        {/* <Square
          name={name}/>
        <Square/>
        <Square/>
        <Square/>
        <Square/>
        <Square/> */}
        
        
        <View style={styles.bottomView} >
          <LogoutButton/>     
        </View>
        

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
      //padding: 20,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    item:{
      padding: 20,
    },
    button:{
      flex: 1,
      justifyContent: 'flex-end',
    },
    bottomView:{
      width: '100%', 
      height: 100, 
      left: 0,
      //backgroundColor: '#FF9800', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
  });