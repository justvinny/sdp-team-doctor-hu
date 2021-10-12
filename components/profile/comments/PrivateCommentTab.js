import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PrivateCommentTab = () => {
  return (
    <View style={styles.container}>
      <Text>Private comment</Text>
    </View>
  );
};

export default PrivateCommentTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
