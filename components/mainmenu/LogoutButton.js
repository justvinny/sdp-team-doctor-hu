import React from 'react';
import {
    View,
    StyleSheet,
    Button
  } from 'react-native';


const logoutButton = () => {

  return (
      <View
      style={styles.buttonStyle}>
        <Button
             title={"Log Out"}
             color={"#F31801"}/>
    </View>

  );

  

};

export default logoutButton;

const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth:2,
        borderRadius:8,
        borderColor:'#F31801',
        overflow:"hidden",
        marginBottom:10
}
});