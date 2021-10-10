import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";

export default function viewFileScreen() {
  // Collects the user's ID.
  const { authUserId } = useContext(AuthContext);
  // I set the user but don't use the data from user this as I get an error undefined is not an object.
  // Not sure how to fix this yet.
  const [user, setUser] = useState({});
  // Just used loading as was copying from other classes on what I had done.
  const [loading, setLoading] = useState(true);

  // Can use either const or let for the storing of variable.
  // Have found both work perfectly fine.
  const [profilePicture, setProfilePicture] = useState();
  //let profile = user.documents[0];

  // Grab the current user & set them,
  // Also set the user
  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading(false);
      // Set the index'ed document in the array as the picture.
      // Make sure to change this if you upload a new document without deleting the old one.
      // As in file upload you are overwriting the document.
      setProfilePicture(data.documents[0]);
    });
  }, []);

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.container}>
        <Text>{profilePicture}</Text>
        <Image style={styles.image} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.8av4relhzgw?alt=media&token=035af25a-f4eb-4844-899b-a3fb96d1f08b" }} />
        {/* {console.log(profilePicture)} */}
        {/* <Text>{user.documents}</Text> */}

        <Object data="https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/document%2FouCHIlPhr3N9Qv7aaqcK8Oie6C42%2F0.8av4relhzgw?alt=media&token=035af25a-f4eb-4844-899b-a3fb96d1f08b" type="application/pdf" width="100%" height="100%">
        {/* <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p> */}
        </Object>
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
