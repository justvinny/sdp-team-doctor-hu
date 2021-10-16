// import React in our code
import React, { useEffect, useState } from "react";
// import all the components we are going to use
import { StyleSheet, View, LogBox, Image, Alert } from "react-native";
import { Text, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../../firebase/firebaseConfig";
import firestoreService from "../../../../firebase/firestoreService";

function UploadProfilePicture({ setProfilePicture, toggleOverlay, user }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const upload = async () => {
    if (image) {
      try {
        const childPath = `profile/${user.id}`;
        const response = await fetch(image);
        const blob = await response.blob();
        const task = await storage.ref().child(childPath).put(blob);

        task.ref.getDownloadURL().then((url) => {
          Alert.alert(
            "Looking Great " + user.name.first + "!",
            "Profile Picture updated successfully.",
            [
              {
                text: "Thanks!",
                onPress: () => toggleOverlay(),
              },
            ]
          );
          firestoreService.updatePicture(user.id, url);
          setProfilePicture(url);
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const removePicture = () => {
    /* Set the profile picture to blank string
    so that React Native knows to use Initials of a User's name
    instead of no profile picture */
    setProfilePicture("");
    firestoreService.updatePicture(user.id, "");
    Alert.alert(
      "Aww Man!",
      "Hope to see your beautiful face again soon " + user.name.first + ".",
      [
        {
          text: "Close",
          onPress: () => toggleOverlay(),
        },
      ]
    );
  };

  const removePictureAlert = () => {
    Alert.alert(
      "Remove Picture",
      "Are you sure you want to remove your profile picture?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removePicture();
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

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

export default UploadProfilePicture;

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
