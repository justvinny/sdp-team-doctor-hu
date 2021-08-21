import React from "react";
import { View, Text, StyleSheet } from "react-native";

function AboutTab() {
  return (
    <View style={styles.contianer}>
      <Text>Hello World</Text>
    </View>
  );
}

export default AboutTab;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    padding: 10,
  },
});
