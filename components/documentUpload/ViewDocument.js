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
import dateUtility from "../../utilities/dateUtility";

const App = ({url, patientId, staffId, title, date}) => {

const { authUserId } = useContext(AuthContext);
const [image, setImage] = useState(url);
const [loading1, setLoading1] = useState(true);
const [loading2, setLoading2] = useState(true);
const [loading3, setLoading3] = useState(true);
const [patient, setPatient] = useState({});
const [staff, setStaff] = useState({});
const [user, setUser] = useState({});


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
      <View style={styles.overlay }>
      <Text style={styles.bold}>Viewing document: 
        <Text style={styles.regular}> {title}</Text>
      </Text>

      <Text style={styles.bold}>Uploaded on: 
        <Text style={styles.regular}> {dateUtility.getFormattedDateNow(new Date(date))}</Text>
      </Text>

      {/* conditonal render name */}
      {user.isStaff ? (
   
        <Text style={styles.bold}>Document uploaded to: 
          <Text style={styles.regular}> {patient.name.first} {patient.name.last} </Text>
        </Text>

        ) : (
              
          <Text style={styles.bold}>Document uploaded by: 
          <Text style={styles.regular}> {staff.name.first} {staff.name.last}</Text>
        </Text>
     
      )}

      {/* Webview allows for viewing of any document types */}
      <WebView  
          style={styles.image}
          source = {{ uri: image }}  
      />  

    </View>
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
    marginTop: 20,
    width: 400,
    height: 500,
  },
<<<<<<< HEAD
  bold: {
    fontWeight: "bold",
  },
  regular: {
    fontWeight: "normal",
  }

=======
  globalButton: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "red"
  },
>>>>>>> parent of b2642b8 (cleaned up)
});
