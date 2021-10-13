import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Image, Text, Button, FlatList, ScrollView, Alert} from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";
import { WebView} from "react-native-webview";
import dateUtility from "../../utilities/dateUtility";
import UploadDocsHomeScreen from "./assets/UploadedDocsHomeScreen.js";
import colorDefaults from "../../theme/colorDefaults";
import { ListItem, Icon, Overlay, Swipeable } from 'react-native-elements';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import DocumentCard from './assets/DocumentCard';
import ViewDocument from "../documentUpload/ViewDocument";


const viewFileScreen= ({navigation}) => {

  // Overlay Controls for Uploading Profile Picture
  const [sheetVisible, setSheetVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  

  // Collects the user's ID.
  const { authUserId } = useContext(AuthContext);
  // I set the user but don't use the data from user this as I get an error undefined is not an object.
  // Not sure how to fix this yet.
  const [user, setUser] = useState({});
  // Just used loading as was copying from other classes on what I had done.
  const [loading, setLoading] = useState(true);
  
  const [documents, setDocuments] = useState([]);
  const [url, setURL] = useState("");
  const [patientId, setPatientId] = useState();
  const [staffId, setStaffId] = useState();
  const [staff, setIsStaff] = useState(false);
  const [time, setTime] = useState();
  const [title, setTitle] = useState();
  const [test, setTest] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Previous Upload Documents",
    });
  }, []);

  // Grab the current user & set them,
  // Also set the user
  useEffect(() => {
    const unsubscribe = firestoreService
    .getUserLive(authUserId)
    .onSnapshot((doc) => {
      
      const data = doc.data();
      setUser(data);
      let s = data.isStaff;
      setIsStaff(s);
      setDocuments(data.medicalResults);
      setTest(data.medicalResults.length);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  


  const removePicture = (deleteIndex) => {
    //setProfilePicture(defaultImage);
  

    // firestoreService.getUserById(staffId).then((data1) => {
    //   console.log(data1.medicalResults);
    //   //setTest(data1.medicalResults);
    // });

    console.log(documents.length);

    setDocuments(documents.filter((index) => index.url != url));
  
    console.log(documents.length);
    //console.log(documents);
  //   const newPalettes = test.filter(
  //     palette => palette.url !== newUrl
  // )

   // console.log(newPalettes);
    //firestoreService.updateMedicalResults(staffId, removeDocument);
    // Alert.alert(
    //   "Document Removed",
   
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     }
    //   ]
    // );
  };

  const removePictureAlert = (i) => {
    Alert.alert(
      "Remove Document",
      "Are you sure you want to remove the Document?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removePicture(i);
            
          },
          style: "destructive",
        },
      ]
    );
  };


  const renderPage = () => {
    if (loading) {
        return <LoadingScreen />
    } else if (!loading && documents.length === 0 ) {
        return (
            <View style={styles.container}>
                <MaterialIcons name="attachment" size={50} color={colorDefaults.primary} style={styles.center} />
                <Text style={styles.noMsgTxt}>No Documents</Text>
            </View>
        )
    }

    return(
      <ScrollView>
        <Text>{test}</Text>
        <View >
                     {
                    documents.map((l, i) => (
                        <ListItem key={i} bottomDivider style={styles.container} >
                          <Icon 
                          name={'pageview'} 
                          onPress={() => 
                            {
                              toggleOverlay();
                              setSheetVisible(false);
                              setURL(l.url);
                              setPatientId(l.patientId);
                              setStaffId(l.staffId);
                              setTime(l.timestamp);
                              } 
                          }
                          />
                        <ListItem.Content>
                            <ListItem.Title style={styles.name}>{l.title}</ListItem.Title>
                            {/* <ListItem.Subtitle  style={styles.subText}>{l.patientId}</ListItem.Subtitle> */}
                        </ListItem.Content>
                        <Text style={[styles.date, styles.subText]}>{dateUtility.getFormattedDateNow(new Date(l.timestamp))}</Text>
                        <Icon 
                          name={'delete'} 
                          onPress={() => 
                            {
                              setURL(l.url);
                              setPatientId(l.patientId);
                              setStaffId(l.staffId);
                              setTime(l.timestamp);
                              setTitle(l.title);
                              removePictureAlert(i);
                              } 
                          }
                          />
                        </ListItem>
                    ))
                    }
                </View>

              <Overlay
              isVisible={overlayVisible}
              onBackdropPress={toggleOverlay}
              overlayStyle={{ backgroundColor: colorDefaults.backDropColor }}
              animationType="slide"
              transparent
              >
              <ViewDocument
              
                url={url}
                patientId={patientId}
                staffId={staffId}
                
              />
            </Overlay>
            </ScrollView>
    )
  }

return (
    <View style={styles.flex}>
        {renderPage()}
    </View>
)
};

export default viewFileScreen;

const styles = StyleSheet.create({
  top:{
    flex: 1,
  },
  container: {
  
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colorDefaults.backDropColor
  },
  center: {
      marginTop: "60%"
  },
  name: {
    fontWeight: "bold"
  },
  date: {
      alignSelf: "flex-end"
  },
  subText: {
      fontSize: 12,
      color: "grey"
}
});