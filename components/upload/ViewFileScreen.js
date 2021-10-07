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
      setProfilePicture(data.documents[1]);
    });
  }, []);

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.container}>
        <Text>{profilePicture}</Text>
        <Image style={styles.image} source={{ uri: profilePicture }} />
        {console.log(profilePicture)}
        {/* <Text>{user.documents}</Text> */}
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
