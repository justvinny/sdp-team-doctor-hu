// import React in our code
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";

// import all the components we are going to use
import { StyleSheet, View, LogBox, Image, Alert } from "react-native";

import { Text, Button } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase/firebaseConfig";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import LoadingScreen from "../../LoadingScreen";

function UploadProfilePicture({ navigation }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { authUserId } = useContext(AuthContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading(false);
    });

    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  const imagePicker = async () => {
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

  const upload = async () => {
    if (image) {
      try {
        const childPath = `profile/${authUserId}`;
        const response = await fetch(image);
        const blob = await response.blob();
        const task = await storage.ref().child(childPath).put(blob);

        task.ref.getDownloadURL().then((url) => {
          Alert.alert(
            "Looking Great " + user.name.first + "!",
            "Profile Picture updated successfully."
          );
          console.log(url);
          firestoreService.updatePicture(authUserId, url);

          navigation.goBack();
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const removePicture = () => {
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
            setImage(
              "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/profile%2Ficon.png?alt=media&token=b4ee677b-3ed3-41ab-9689-1ba237967830"
            );
            firestoreService.updatePicture(authUserId, image);
            upload();
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Upload Profile Picture",
    });
  }, []);

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <View style={styles.container}>
        <Text h3>Looking Good!</Text>
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
            source={require("../../../assets/icon.png")}
          ></Image>
        )}
        <Button
          title="Upload Profile Picture"
          onPress={upload}
          buttonStyle={styles.globalButton}
        />
        <Button
          title="Remove Profile Picture"
          onPress={removePicture}
          buttonStyle={[styles.globalButton, styles.removeButton]}
        />
      </View>
    );
  };

  return renderPage();
}

export default UploadProfilePicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
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
