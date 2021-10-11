import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text
} from 'react-native';
import colorDefaults from '../../theme/colorDefaults';
import { MaterialIcons } from '@expo/vector-icons';
import Badge from './Badge';

const Square = (props) => {
  const navigateScreen = () => {
    if (props.route) {
      props.navigation.navigate(props.route, { isStaff: props.isStaff });
    }
  };

  /*
    Conditionally renders a badge to the menu screen icons.
  */
  const renderBadge = () => {
    if (props.notificationsBadge == undefined || props.notificationsBadge == 0) {
      return <></>
    }
    return <Badge number={props.notificationsBadge} />
  }
  return (
    <TouchableOpacity onPress={navigateScreen}>
      <View style={{ padding: 10 }}>
        <View style={styles.square} />
        <View style={styles.circle} />
        <MaterialIcons style={styles.icon} name={props.icon} size={40} color={colorDefaults.iconColor} />
        <Text style={styles.text}>{props.name}</Text>
        {renderBadge()}
      </View>
    </TouchableOpacity>
  );
};

export default Square;

const styles = StyleSheet.create({
  square: {
    width: 160,
    height: 160,
    backgroundColor: colorDefaults.bottomBorderColor,
    borderRadius: 6,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: colorDefaults.secondary,
    borderWidth: 5,
    backgroundColor: colorDefaults.bottomBorderColor,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 130,
  },
  icon: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 50,
  },
});
