import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";
import { WebView} from "react-native-webview";
import dateUtility from "../../utilities/dateUtility";
import UploadDocsHomeScreen from "../../components/documentUpload/UploadedDocsHomeScreen";
import colorDefaults from "../../theme/colorDefaults";
import { ListItem, Avatar } from 'react-native-elements'

export default function viewFileScreen() {
  // Collects the user's ID.
  const { authUserId } = useContext(AuthContext);
  // I set the user but don't use the data from user this as I get an error undefined is not an object.
  // Not sure how to fix this yet.
  const [user, setUser] = useState({});
  // Just used loading as was copying from other classes on what I had done.
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [time, setTime] = useState();
  const [url, setUrl] = useState("");


  const [documents, setDocuments] = useState({});


  const list = [
    {
      name: 'Amy Farha',
      subtitle: 'Vice President'
    },
    {
      name: 'Chris Jackson',
      subtitle: 'Vice Chairman'
    },

  ]



  // function setDocURL(data) {
  //   let test = data.documents[12].url;
  //   setDocuments(test);
  // }

  function setDocsFunction(data) {
    const test = data.documents;
      //console.log(test);
      setDocuments({test});
      console.log(documents);
  }

  // Grab the current user & set them,
  // Also set the user
  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      
      // setTitle(data.documents[12].title);
      // setTime(data.documents[12].timestamp);
      //setDocURL(data);

      
      
      setDocsFunction(data);
      setLoading(false);
     
    });
  }, []);

  // const getMeta = () => {
  //   getMetadata(url)
  // .then((metadata) => {
  //   console.log(metadata);
  // })
  // .catch((error) => {
  //   console.log("error");
  // });
  // };

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <View >
        {/* <Text>{profilePicture}</Text>
        <Image style={styles.image} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.8av4relhzgw?alt=media&token=035af25a-f4eb-4844-899b-a3fb96d1f08b" }} />
        {/* {console.log(profilePicture)} */}
        {/* <Text>{user.documents}</Text> */} 
        {/* <Text>{title}</Text>
        <Text>{dateUtility.getFormattedDateNow(new Date(time))}</Text>
        <WebView  
            style={styles.image}
            source = {{ uri: url }}  
            />   */}

            {/* <UploadDocsHomeScreen 
              loading={loading}
            /> */}

        <View>
          {
            list.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
      </View>
    );
  };

  return renderPage();
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colorDefaults.backDropColor,
//     padding: 10,
//     alignItems: "center",
//     alignContent: "center",
//   },
//   image: {
//     margin: 10,
//     width: 400,
//     height: 400,
//   },
// });
