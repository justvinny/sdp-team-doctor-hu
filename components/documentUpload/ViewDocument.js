import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  LogBox,
  Button,
  Image,
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

const App = ({url, patientId}) => {

const { authUserId } = useContext(AuthContext);
const [image, setImage] = useState(url);
const [loading, setLoading] = useState(true);
const [user, setUser] = useState({});


 

  useEffect(() => {
    firestoreService.getUserById(patientId).then((data) => {
      setUser(data);
      setLoading(false);
     
    });
  }, []);


  const renderPage = () => {
    if (loading) {
      return <LoadingScreen style={styles.overlay}/>;
    }
    return (
        <View style={styles.overlay}>
            <Text>Document uploaded to : {user.name.first} {user.name.last} </Text>
        <WebView  
            style={styles.image}
            source = {{ uri: image }}  
            />  

        <Button
          title="Delete Document"
          
          buttonStyle={styles.globalButton}
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
    width: 400,
    height: 500,
  },
  globalButton: {
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "red"
  },
});
