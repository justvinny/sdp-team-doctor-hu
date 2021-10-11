import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Image, Text, Button, FlatList, ScrollView} from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";
import { WebView} from "react-native-webview";
import dateUtility from "../../utilities/dateUtility";
import UploadDocsHomeScreen from "./assets/UploadedDocsHomeScreen.js";
import colorDefaults from "../../theme/colorDefaults";
import { ListItem, Icon, Overlay } from 'react-native-elements';
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
      setDocuments(data.documents);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // const renderPage = () => {
  //   if (loading) {
  //     return <LoadingScreen />;
  //   }
  //   return (
  //     <View style={styles.container}>
  //       {/* <Text>{profilePicture}</Text>
  //       <Image style={styles.image} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.8av4relhzgw?alt=media&token=035af25a-f4eb-4844-899b-a3fb96d1f08b" }} />
  //       {/* {console.log(profilePicture)} */}
  //       {/* <Text>{user.documents}</Text> */} 
  //       {/* <Text>{title}</Text>
  //       <Text>{dateUtility.getFormattedDateNow(new Date(time))}</Text> */}


  //           {/* <UploadDocsHomeScreen 
  //             loading={loading}
  //           /> */}

  //       <View style={styles.container}>
  //         {
  //           documents.map((l, i) => (
  //             <ListItem key={i} bottomDivider style={styles.container}>
  //               <ListItem.Content>
  //                 <ListItem.Title style={styles.name}>{l.title}</ListItem.Title>
  //                 <ListItem.Subtitle  style={styles.subText}>{l.patientId}</ListItem.Subtitle>
  //               </ListItem.Content>
  //               <Text style={[styles.date, styles.subText]}>{dateUtility.getFormattedDateNow(new Date(l.timestamp))}</Text>
  //             </ListItem>
  //           ))
  //         }
  //       </View>

  //       {/* {documents.map((document, index) => <Text key={index}>{document.url}</Text>)} */}

  //     </View>
  //   );
  // };

  // return renderPage();
  const renderPage = () => {
    if (loading) {
        return <LoadingScreen />
    } else if (!loading && documents.length === 0) {
        return (
            <>
                <MaterialIcons name="attachment" size={50} color={colorDefaults.primary} style={styles.center} />
                <Text style={styles.noMsgTxt}>No Documents</Text>
            </>
        )
    }

    return(
      <ScrollView>
        <View style={styles.container}>
                     {
                    documents.map((l, i) => (
                        <ListItem key={i} bottomDivider style={styles.container}>
                          <Icon 
                          name={'pageview'} 
                          onPress={() => 
                            {
                              toggleOverlay();
                              setSheetVisible(false);
                              setURL(l.url);
                              setPatientId(l.patientId);
                              } 
                          }
                          />
                        <ListItem.Content>
                            <ListItem.Title style={styles.name}>{l.title}</ListItem.Title>
                            {/* <ListItem.Subtitle  style={styles.subText}>{l.patientId}</ListItem.Subtitle> */}
                        </ListItem.Content>
                        <Text style={[styles.date, styles.subText]}>{dateUtility.getFormattedDateNow(new Date(l.timestamp))}</Text>
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
                //setProfilePicture={setProfilePicture}
                //toggleOverlay={toggleOverlay}
                url={url}
                patientId={patientId}
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