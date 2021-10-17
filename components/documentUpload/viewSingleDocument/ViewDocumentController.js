import React, { useEffect, useState, useContext } from "react";
import { Alert, Platform } from "react-native";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import ViewDocumentView from "./ViewDocumentView";

const ViewDocumentController = ({ url, patientId, staffId, title, date }) => {
  const { authUserId } = useContext(AuthContext);
  const [image, setImage] = useState(url);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [patient, setPatient] = useState({});
  const [staff, setStaff] = useState({});
  const [user, setUser] = useState({});

  //populate the needed information
  //using three load checks to confirm all information is present and not undefined
  //need to get live names from the system to reflect any changes in real time
  useEffect(() => {
    firestoreService.getUserById(patientId).then((data) => {
      setPatient(data);
      setLoading1(false);
    });
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading2(false);
    });
    firestoreService.getUserById(staffId).then((data) => {
      setStaff(data);
      setLoading3(false);
    });
  }, []);

  if (Platform.OS === "android") {
    useEffect(() => {
      window.setTimeout(() => {
        Alert.alert(
          "Android Info",
          "Non-image files on android will be downloaded. Check your downloads folder to view.",
          [
            {
              text: "Ok",
            },
          ]
        );
      }, 750);
    }, []);
  }

  return <ViewDocumentView 
      title={title} 
      date={date}
      loading1={loading1}
      loading2={loading2}
      loading3={loading3}
      patient={patient}
      staff={staff}
      image={image}
      user={user}
  />

};

export default ViewDocumentController;

