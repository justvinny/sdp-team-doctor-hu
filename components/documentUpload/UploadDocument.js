// import React in our code
import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
// import all the components we are going to use
import { StyleSheet, View, LogBox, Image, Alert , Text} from "react-native";
import {
  Button,
  Input,
  Icon,
} from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/firebaseConfig";
import firestoreService from "../../firebase/firestoreService";
import * as DocumentPicker from "expo-document-picker";
import ProgressBar from '../documentUpload/ProgressBar'


function UploadDocument({
  toggleDocumentOverlay,
  patient,
  staff,
  patientName,
}) {
  const [file, setFile] = useState("");
  const [download, showDownload] = useState(false);
  const [title, setTitle] = useState("");
  const [progress, showProgress] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  //image picker
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setFile(result.uri);
      showDownload(true);
    }
    else  {
      showDownload(false);
    }
   
  };

  //document picker
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type !== "cancel") {
      setFile(result.uri);
      showDownload(true);

      if (result?.name !== undefined ) {
        Alert.alert(
          "Use the existing document name or make your own?",
          "Exisiting title: " + result.name,
          [
            {
              text: "No",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                setTitle(result.name);
              },
              style: "destructive",
            },
          ]
        );
      }
    }
    else  {
      showDownload(false);
    }
    
  };

  const upload = async () => {
    if (file) {
      try {
        showProgress(true);
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

          const newDocument = {
            staffId: staff,
            patientId: patient,
            url: url,
            timestamp: Date.now(),
            title: title,
          };

          firestoreService.addMedicalResult(staff, newDocument);
          firestoreService.addMedicalResult(patient, newDocument);

          showProgress(false);
          showDownload(false);

          Alert.alert(
            "Document '" + title + "' for " + patientName,
            "Document updated successfully.",
            [
              {
                text: "Thanks!",
                
              },
            ]
          );
          setTitle("");
        });
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

  // checks title is present and progresses to upload
  const checkTitleInput = () => {
    //Check for the Name TextInput
    if (!title.trim()) {
      alert("Please enter a Document Title before uploading.");
      return;
    } else {
      upload();
    }
  };

  const renderPage = () => {
    return (
      <View style={styles.container}>
      {/* screen coniditon showing on status of loading document */}
      { 
          progress ? 
          <View style={styles.container}>
              <Text>Won't be a second, just uploading your document!</Text> 
              <Text>Please don't navigate from the upload screen.</Text> 
              
              <ProgressBar>
                
              </ProgressBar>
          </View>
          : <>
          <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 20,}}>
          Upload Document for: 
            <Text style={{fontWeight: "bold"}}> {patientName}</Text>
          </Text>

          {/* Document title */}
          <Input
            placeholder="Document Title"
            leftIcon={{ type: "document", name: "label" }}
            // style={styles}
            value={title}
            onChangeText={(title) => setTitle(title)}
          />
  
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

        {/* document attached and can be uploaded  */}
        { 
          download ? 
            <View style={styles.container}>
              <Text>Document attached successfully!</Text> 
              <Text>Click Upload Document to continue.</Text> 

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
                buttonStyle={styles.uploadButton}
                />

            </View>
          : 
          <></>
        }

        {/* cancel button */}
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
          buttonStyle={styles.removeButton}
        />
          
          </>
        }
  
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
  },
  globalButton: {
    borderRadius: 10,
    marginTop: 30,
  },
  removeButton: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "red",
  },
  uploadButton: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "green",
  },
});
