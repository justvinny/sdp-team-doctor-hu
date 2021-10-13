import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LogBox,
  Button,
  Image,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colorDefaults from "../../theme/colorDefaults";
import { storage } from "../../firebase/firebaseConfig";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from "react-native-webview";
import LoadingScreen from "../LoadingScreen";

const App = ({url, patientId, staffId}) => {

const { authUserId } = useContext(AuthContext);
const [image, setImage] = useState(url);
const [loading1, setLoading1] = useState(true);
const [loading2, setLoading2] = useState(true);
const [loading3, setLoading3] = useState(true);
const [patient, setPatient] = useState({});
const [staff, setStaff] = useState({});
const [user, setUser] = useState({});
const [tasks, setTasks] = useState([]);
 

  // useEffect(() => {
  //   firestoreService.getUserById(patientId).then((data) => {
  //     setPatient(data);
  //     setLoading1(false);
  //   });
  
  // }, []);

  // useEffect(() => {
  //   firestoreService.getUserById(authUserId).then((data) => {
  //     setUser(data);
  //     setLoading2(false);
  //   });

  // }, []);

  // useEffect(() => {
  //   firestoreService.getUserById(staffId).then((data) => {
  //     setStaff(data);
  //     setLoading3(false);
  //   });
  // }, []);

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



 

  


  const renderPage = () => {
    if (loading1 || loading2 || loading3) {
      return <LoadingScreen style={styles.overlay}/>;
    }
    return (
      <>
      {user.isStaff ? (
        <View style={styles.overlay}>
          <Text>Document uploaded to: {patient.name.first} {patient.name.last} </Text>
            <WebView  
                style={styles.image}
                source = {{ uri: image }}  
                />  
        </View>
      ) : (
        <View style={styles.overlay}>
          <Text>Document uploaded by: {staff.name.first} {staff.name.last} </Text>
            <WebView  
                style={styles.image}
                source = {{ uri: image }}  
                />  
        </View>
      )}
    </>
  );
};

  return renderPage();
   
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  overlay: {
    width: 400,
    height: 650,
  },
  image: {
    width: 400,
    height: 500,
  },
  globalButton: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "red"
  },
});
