import React from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';


export default logoutButton = ({ signOut }) => {

  return (
    <View
      style={styles.buttonStyle}>
      <Button
        title={"Log Out"}
        color={"#F31801"}
        onPress={signOut}
      />
    </View>

  );



};

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#F31801',
    overflow: "hidden",
    marginBottom: 10
  }
});