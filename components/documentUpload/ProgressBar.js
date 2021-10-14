import React, { useEffect, useState, useLayoutEffect, useContext, Component} from "react";
import { StyleSheet, TouchableOpacity, View,} from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

const ProgressBar = () => {
  
    return (

        <Progress.Bar
           style={styles.progress}
            indeterminate= {true}
            progress = {0}
            width={250}
            color={'#8870e6'}
          
        />
    );
  
};


export default  ProgressBar ;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
    progress: {
      margin: 10,
      
    },
  });