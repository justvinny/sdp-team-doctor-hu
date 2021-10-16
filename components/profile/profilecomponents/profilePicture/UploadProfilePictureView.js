// import React in our code
import React from "react";
// import all the components we are going to use
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-elements";

function UploadProfilePictureView({
  imagePicker,
  image,
  upload,
  removePictureAlert,
  toggleOverlay,
}) {
  const renderPage = () => {
    return (
      <View style={styles.container}>
        <Text h3 style={{ textAlign: "center", marginBottom: 20 }}>
          Upload Profile Picture
        </Text>
        <Button
          title="Choose Photo"
          onPress={imagePicker}
          buttonStyle={styles.globalButton}
        />
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Image
            style={styles.image}
            source={require("../../../../assets/icon.png")}
          ></Image>
        )}
        <Button
          title="Upload Profile Picture"
          onPress={upload}
          buttonStyle={styles.globalButton}
        />
        <Button
          title="Remove Profile Picture"
          onPress={removePictureAlert}
          buttonStyle={[styles.globalButton, styles.removeButton]}
        />
        <Button
          title="Cancel"
          onPress={toggleOverlay}
          buttonStyle={styles.globalButton}
        />
      </View>
    );
  };

  return renderPage();
}

export default UploadProfilePictureView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  globalButton: {
    borderRadius: 10,
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: "red",
  },
});
