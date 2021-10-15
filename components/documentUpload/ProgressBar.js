import React, { useEffect, useState, useLayoutEffect, useContext, Component} from "react";
import { StyleSheet, TouchableOpacity, View,} from 'react-native';
import * as Progress from 'react-native-progress';

// progress bar component
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
    progress: {
      margin: 10,
    },
  });