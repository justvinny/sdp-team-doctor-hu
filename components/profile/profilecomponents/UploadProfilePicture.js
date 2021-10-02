import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { auth, storage } from "../../../firebase/firebaseConfig";

const UploadProfilePicture = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const betterUpload = async () => {
    if (image) {
      try {
        const childPath = `picture/${Math.random().toString(36)}`;
        const response = await fetch(image);
        const blob = await response.blob;
        const task = await storage.ref().child(childPath).put(blob);

        task.ref.getDownloadURL().then((url) => alert(url));
      } catch (e) {
        console.log(e);
      }
    }
  };

  //   const uploadImage = async ({ uri }) => {
  //     console.log("URI: " + uri);
  //     const blob = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = function (e) {
  //         console.log("ON ERROR: " + e);
  //         reject(new TypeError("Network request failed"));
  //       };
  //       xhr.responseType = "blob";
  //       xhr.open("GET", uri, true);
  //       xhr.send(null);
  //     });

  //     const ref = firebase.storage().ref().child(uuid.v4());
  //     const snapshot = await ref.put(blob);
  //     console.log(blob);

  //     blob.close();

  //     return await snapshot.ref.getDownloadURL();
  //   };

  return (
    <View>
      <Text>Upload Profile Picture</Text>
      <Button title="Pick a photo" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload" onPress={betterUpload} />
    </View>
  );
};

export default UploadProfilePicture;

const styles = StyleSheet.create({});
