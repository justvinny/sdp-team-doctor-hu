// import React in our code
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";

// import all the components we are going to use
import {
  StyleSheet,
  View,
  Text,
  LogBox,
  Button,
  Image,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase/firebaseConfig";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import LoadingScreen from "../../LoadingScreen";

function UploadProfilePicture({ navigation }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { authUserId } = useContext(AuthContext);

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading(false);
    });

    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  const [image, setImage] = useState("");

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

        //task.ref.getDownloadURL().then((url) => alert(url));
        task.ref
          .getDownloadURL()
          .then(() =>
            Alert.alert(
              "Looking Great " + user.name.first + "!",
              "Profile Picture updated successfully."
            )
          );

        navigation.goBack();
      } catch (error) {
        alert(error.message);
      }
    }
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
      <View style={{ alignItems: "center" }}>
        <Text>Upload Profile Picture</Text>
        <Button title="Pick a photo" onPress={imagePicker} />
        {image ? (
          <Image style={{ width: 200, height: 400 }} source={{ uri: image }} />
        ) : (
          <></>
        )}
        <Button title="Upload" onPress={upload} />
      </View>
    );
  };

  return renderPage();
}

export default UploadProfilePicture;

const styles = StyleSheet.create({});
