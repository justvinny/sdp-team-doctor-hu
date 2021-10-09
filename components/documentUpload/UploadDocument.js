// import React in our code
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";

// import all the components we are going to use
import { StyleSheet, View, LogBox, Image, Alert } from "react-native";

import { Text, Button, Input } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/firebaseConfig";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";

function UploadDocument({toggleDocumentOverlay}){
  const [image, setImage] = useState("");
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/profile%2Ficon.png?alt=media&token=b4ee677b-3ed3-41ab-9689-1ba237967830";

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
        const childPath = `document/${authUserId}/${authUserId}`;
        const response = await fetch(image);
        const blob = await response.blob();
        const task = await storage.ref().child(childPath).put(blob);

        task.ref.getDownloadURL().then((url) => {
          Alert.alert(
            "Document " + title + " for " + " patient ",
            "Document updated successfully.",
            [
              {
                text: "Thanks!",
                onPress: () => toggleDocumentOverlay(),
              },
            ]
          );
          
          //firestoreService.addStaffDoc(authUserId, url);
          //firestoreService.addMedicalResult(patientID, url);

          //firestoreService.updatePicture(user.id, url);
          //setProfilePicture(url);
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
      alert('Please Enter a Document tite');
      return;
    }
    else{
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
          Upload Patient Document
        </Text>

        {/* Document title */}
        <Input
          placeholder="Document Title"
          leftIcon={{ type: 'document', name: 'label' }}
          // style={styles}
          value={title}
          onChangeText={title => setTitle(title)}
          />
             <Text h3 style={{ textAlign: "center", marginBottom: 20 }}>
              {title}
            </Text> 

           {/* Document note */}    
          <Input
          placeholder="Any notes"
          leftIcon={{ type: 'document', name: 'comment' }}
          value={note}
          onChangeText={note => setNote(note)}
          // style={styles}
         
          />
            <Text h3 style={{ textAlign: "center", marginBottom: 20 }}>
              {note}
            </Text> 
        <Button
          title="Choose Document"
          onPress={imagePicker}
          buttonStyle={styles.globalButton}
        />
        
        {/* {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Image
            style={styles.image}
            source={require("../../../assets/icon.png")}
          ></Image>
        )} */}
        <Button
          title="Upload Document"
          onPress={checkTitleInput}
          buttonStyle={styles.globalButton}
        />
        {/* <Button
          title="Remove Document"
          onPress={removePictureAlert}
          buttonStyle={[styles.globalButton, styles.removeButton]}
        /> */}
        <Button
          title="Cancel"
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
    // flex: 1,
    alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
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
