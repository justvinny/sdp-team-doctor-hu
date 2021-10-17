// import React in our code
import React, { useEffect, useState } from "react";
// import all the components we are going to use
import { Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../../firebase/firebaseConfig";
import firestoreService from "../../../../firebase/firestoreService";
import UploadProfilePictureView from "./UploadProfilePictureView";

function UploadProfilePictureController({
  setProfilePicture,
  toggleOverlay,
  user,
}) {
  const [image, setImage] = useState("");

  // Only run on android and ios. Webpack does not have Logbox.
  if (Platform.OS === "android" || Platform.OS === "ios") {
    useEffect(() => {
      const LogBox = require("react-native").LogBox;
      LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    }, []);
  }

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

  return (
    <UploadProfilePictureView
      imagePicker={imagePicker}
      image={image}
      upload={upload}
      removePictureAlert={removePictureAlert}
      toggleOverlay={toggleOverlay}
    />
  );
}

export default UploadProfilePictureController;
