import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Alert } from "react-native";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import ViewFileScreenView from "./ViewFileScreenView";

// View Document/Files main screen
const ViewFileScreenController = ({ navigation, route }) => {
  // Overlay Controls for viewing files
  const [sheetVisible, setSheetVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // populate the states
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [url, setURL] = useState("");
  const [patientId, setPatientId] = useState();
  const [staffId, setStaffId] = useState();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Upload Documents",
    });
  }, []);

  //sets useStates
  useEffect(() => {
    let userId = authUserId;
    if (route.params.passedId !== undefined) {
      userId = route.params.passedId;
    }
    const unsubscribe = firestoreService
      .getUserLive(userId)
      .onSnapshot((doc) => {
        const data = doc.data();
        setUser(data);
        setDocuments(data.medicalResults);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  //removing a document or picture
  const removeDocument = async (deleteIndex) => {
    try {
      Alert.alert(
        "Document '" + documents[deleteIndex].title + "'",
        "deleted successfully.",
        [
          {
            text: "Thanks!",
          },
        ]
      );

      firestoreService.deleteMedicalResultsBoth(documents[deleteIndex]);
    } catch (error) {
      alert(error.message);
    }
  };

  //alert to confirm removing
  const removeDocumentAlert = async (i) => {
    Alert.alert(
      "Remove Document",
      "Are you sure you want to remove the document " +
        documents[i].title +
        "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removeDocument(i);
          },
          style: "destructive",
        },
      ]
    );
  };

  //updating or editing document
  const updatedDocument = async (newName, index) => {
    try {
      //remove document from patient account
      firestoreService.deleteMedicalResultsPatient(documents[index]);

      //update record on staff account
      // updates by duplicating the array with desired changes
      documents[index].title = newName;
      setDocuments([...documents]);
      firestoreService.updateMedicalResults(
        documents[index].staffId,
        documents
      );

      //add duplicated document with new edit to patient account
      firestoreService.addMedicalResult(
        documents[index].patientId,
        documents[index]
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // alert to get edit text and confirm edit
  const editDocument = (index) => {
    Alert.prompt(
      "Enter new document title ",
      "Current: " + documents[index].title,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (newName) => updatedDocument(newName, index),
        },
      ]
    );
  };

  return <ViewFileScreenView 
      loading={loading}
      documents={documents}
      url={url}
      patientId={patientId}
      staffId={staffId}
      title={title}
      overlayVisible={overlayVisible}
      toggleOverlay={toggleOverlay}
      date={date}
      setDate={setDate}
      setPatientId={setPatientId}
      setStaffId={setStaffId}
      setSheetVisible={setSheetVisible}
      setTitle={setTitle}
      user={user}
      removeDocumentAlert={removeDocumentAlert}
      editDocument={editDocument}
      setURL={setURL}
  />;
};

export default ViewFileScreenController;
