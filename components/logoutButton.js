import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    Button
  } from 'react-native';


export default logoutButton = () => {

    return (
        <View
        style={styles.buttonStyle}>
          <Button
               title={"Log Out"}
               color={"#F31801"}/>
      </View>

    );

    

};

const styles = StyleSheet.create({
    buttonStyle: {
        borderWidth:2,
        borderRadius:8,
        borderColor:'#F31801',
        overflow:"hidden",
        marginBottom:10
}
});