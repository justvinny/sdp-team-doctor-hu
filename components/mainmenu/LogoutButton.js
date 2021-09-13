import React from 'react';
import {
  View,
  StyleSheet,
  Button
} from 'react-native';
import colorDefaults from '../../theme/colorDefaults';


const logoutButton = ({ signOut }) => {

  return (
    <View
      style={styles.buttonStyle}>
      <Button
        title={"Log Out"}
        color={colorDefaults.logOutButton}
        onPress={signOut}
      />
    </View>

  );

};

export default logoutButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: colorDefaults.logOutButton,
    overflow: "hidden",
    marginBottom: 10
  }
});