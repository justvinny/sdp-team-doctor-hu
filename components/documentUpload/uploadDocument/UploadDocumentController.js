// import React in our code
import React, { useEffect, useState } from "react";
// import all the components we are going to use
import { Platform, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase/firebaseConfig";
import firestoreService from "../../../firebase/firestoreService";
import * as DocumentPicker from "expo-document-picker";
import Staff from "../../../models/Staff";
import UploadDocumentView from "./UploadDocumentView";

// Upload documents/images to patient profile
function UploadDocumentController({
  toggleDocumentOverlay,
  patient,
  staff,
  patientName,
}) {
  const [file, setFile] = useState("");
  const [download, showDownload] = useState(false);
  const [title, setTitle] = useState("");
  const [progress, showProgress] = useState(false);

  if (Platform.OS === "android" || Platform.OS === "ios") {
    useEffect(() => {
      const LogBox = require("react-native").LogBox;
      LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    }, []);
  }

  // can upload either a camera image or doucment
  //image picker
  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setFile(result.uri);
      showDownload(true);
    } else {
      showDownload(false);
    }
  };

  //document picker
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: false,
    });

    if (result.type !== "cancel") {
      setFile(result.uri);
      showDownload(true);

      if (result?.name !== undefined) {
        Alert.alert(
          "Use the existing document title or make your own?",
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
    } else {
      showDownload(false);
    }
  };

  // uploads document to firestorage and firebase
  const upload = async () => {
    if (file) {
      try {
        showProgress(true);
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

          //adds upload doucment to patient and staff profiles
          firestoreService.addMedicalResult(staff, newDocument);
          firestoreService.addMedicalResult(patient, newDocument);

          showProgress(false);
          showDownload(false);

          // Send notification to user
          firestoreService.getUserById(staff).then((user) => {
            const _staff = Staff.staffFirestoreFactory(user);
            const newNotification = {
              type: "result",
              content: newDocument.title,
              isRead: false,
              timestamp: newDocument.timestamp,
              from: _staff.getFullName(),
            };
            firestoreService.addNotification(
              newDocument.patientId,
              newNotification
            );
          });

          Alert.alert(
            "Document '" + title + "' for " + patientName,
            "Document updated successfully!",
            [
              {
                text: "Thanks!",
              },
            ]
          );
          setTitle("");
        });
      } catch (error) {
          showProgress(false);
          showDownload(false);
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

  // checks title is present into order to progresses to upload
  const checkTitleInput = () => {
    //Check for the title TextInput
    if (!title.trim()) {
      alert("Please enter a Document Title before uploading.");
      return;
    } else {
      upload();
    }
  };

  return <UploadDocumentView 
    toggleDocumentOverlay={toggleDocumentOverlay}
    patientName={patientName}
    download={download}
    title={title}
    setTitle={setTitle}
    progress={progress}
    pickDocument={pickDocument}
    imagePicker={imagePicker}
    checkTitleInput={checkTitleInput}
  />
}

export default UploadDocumentController;

