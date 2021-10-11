import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";
import { WebView } from "react-native-webview";
import dateUtility from "../../utilities/dateUtility";

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

  // const url = "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.u0x6gjh61c?alt=media&token=ce8cff58-d567-43c9-afeb-61f56f403c23";


  //const forestRef = ref(storage, url);
  // Can use either const or let for the storing of variable.
  // Have found both work perfectly fine.
  const [documentToView, setDocumentToView] = useState();
  //let profile = user.documents[0];

  // Grab the current user & set them,
  // Also set the user
  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading(false);
      setTitle(data.documents[12].title);
      setTime(data.documents[12].timestamp);
      setUrl(data.documents[12].url);
      console.log("1 "+url);
      console.log("2 "+data.documents[12].url);
     
      //console.log(dateUtility.getFormattedDateNow(new Date(time)));
     
      // Set the index'ed document in the array as the picture.
      // Make sure to change this if you upload a new document without deleting the old one.
      // As in file upload you are overwriting the document.
      //setDocumentToView(user.documents[11]);
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
      <View style={styles.container}>
        {/* <Text>{profilePicture}</Text>
        <Image style={styles.image} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.8av4relhzgw?alt=media&token=035af25a-f4eb-4844-899b-a3fb96d1f08b" }} />
        {/* {console.log(profilePicture)} */}
        {/* <Text>{user.documents}</Text> */} 
        <Text>{title}</Text>
        <Text>{dateUtility.getFormattedDateNow(new Date(time))}</Text>
        <WebView  
            style={styles.image}
            source = {{ uri: "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.u0x6gjh61c?alt=media&token=ce8cff58-d567-43c9-afeb-61f56f403c23" }}  
            />  
      </View>
    );
  };

  return renderPage();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    margin: 10,
    width: 400,
    height: 400,
  },
});
