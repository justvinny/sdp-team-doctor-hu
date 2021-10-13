// import React in our code
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";

// import all the components we are going to use
import { StyleSheet, View, LogBox, Image, Alert } from "react-native";

import {
  Text,
  Button,
  Input,
  LinearProgress,
  Icon,
} from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/firebaseConfig";
import firestoreService from "../../firebase/firestoreService";
import * as DocumentPicker from "expo-document-picker";

function UploadDocument({
  toggleDocumentOverlay,
  patient,
  staff,
  patientName,
}) {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  //document picker
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  const upload = async () => {
    if (file) {
      try {
        // const metadata = {
        //     customMetadata: {
        //       //contentType: 'application/pdf',
        //       // 'note': 'Hiking'
        //     }
        //   };
        // Links to meta data.
        //const task = await storage.ref().child(childPath).put(blob, metadata);
        const childPath = `document/${patient}/${Math.random().toString(36)}`;
        const response = await fetch(file);
        const blob = await response.blob();
        const task = await storage.ref().child(childPath).put(blob);

        task.ref.getDownloadURL().then((url) => {
          Alert.alert(
            "Document '" + title + "' for " + patientName,
            "Document updated successfully.",
            [
              {
                text: "Thanks!",
                onPress: () => toggleDocumentOverlay(),
              },
            ]
          );

          const newDocument = {
            staffId: staff,
            patientId: patient,
            url: url,
            timestamp: Date.now(),
            title: title,
          };

          firestoreService.addMedicalResult(staff, newDocument);
          firestoreService.addMedicalResult(patient, newDocument);
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  //   const removePicture = () => {
  //     setProfilePicture(defaultImage);
  //     firestoreService.updatePicture(user.id, defaultImage);
  //     Alert.alert(
  //       "Aww Man!",
  //       "Hope to see your beautiful face again soon " + user.name.first + ".",
  //       [
  //         {
  //           text: "Close",
  //           onPress: () => toggleOverlay(),
  //         },
  //       ]
  //     );
  //   };

  //   const removePictureAlert = () => {
  //     Alert.alert(
  //       "Remove Picture",
  //       "Are you sure you want to remove your profile picture?",
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //         },
  //         {
  //           text: "Yes",
  //           onPress: () => {
  //             removePicture();
  //           },
  //           style: "destructive",
  //         },
  //       ]
  //     );
  //   };

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

  const checkTitleInput = () => {
    //Check for the Name TextInput
    if (!title.trim()) {
      alert("Please Enter a Document tite");
      return;
    } else {
      upload();
    }
    //Checked Successfully
    //Do whatever you want
    //alert('Success');
  };

  const renderPage = () => {
    return (
      <View style={styles.container}>
        <Text h3 style={{ textAlign: "center", marginBottom: 20 }}>
          Upload Document for:
        </Text>

        <Text h4 style={{ textAlign: "center", marginBottom: 20 }}>
          {patientName}
        </Text>
        {/* Document title */}
        <Input
          placeholder="Document Title"
          leftIcon={{ type: "document", name: "label" }}
          // style={styles}
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        {/* <Text h3 style={{ textAlign: "center", marginBottom: 20 }}>
          {title}
        </Text> */}

        {/* Document note */}
        {/* <Input
          placeholder="Any notes"
          leftIcon={{ type: 'document', name: 'comment' }}
          value={note}
          onChangeText={note => setNote(note)}
          // style={styles}
         
          />
            <Text h3 style={{ textAlign: "center", marginBottom: 20 }}>
              {note}
            </Text>  */}

        {
          /* Show a file preview */
          file ? <Image style={styles.image} source={{ uri: file }} /> : <></>
        }
        <Button
          title="Choose Image"
          icon={
            <Icon
              name="camera"
              type="font-awesome-5"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          onPress={imagePicker}
          buttonStyle={styles.globalButton}
        />

        <Button
          title="Choose Document"
          icon={
            <Icon
              name="file-upload"
              type="font-awesome-5"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          onPress={pickDocument}
          buttonStyle={styles.globalButton}
        />

        <Button
          title="Upload Document"
          icon={
            <Icon
              name="upload"
              type="font-awesome-5"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          onPress={checkTitleInput}
          buttonStyle={styles.globalButton}
        />

        <Button
          title="Cancel"
          icon={
            <Icon
              name="times"
              type="font-awesome-5"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          onPress={toggleDocumentOverlay}
          buttonStyle={styles.globalButton}
        />
      </View>
    );
  };

  return renderPage();
}

export default UploadDocument;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    // flex: 1,
    // alignContent: "center",
    // justifyContent: "center",
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 10,
    marginTop: 10,
  },
  globalButton: {
    borderRadius: 10,
    marginTop: 20,
  },
  removeButton: {
    backgroundColor: "red",
  },
});
