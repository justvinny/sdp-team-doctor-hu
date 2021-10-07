import { auth, storage } from '../../firebase/firebaseConfig';
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import colorDefaults from '../../theme/colorDefaults';
import AuthContext from "../../context/AuthContext";
import { Text } from 'react-native';


const viewFileScreen = ({ }) => {

  // const {imageName} = this.state;
  // let imageRef = storage().ref('/' + imageName);
  // imageRef
  // .getDownloadURL()
  // .then((url) => {
  //   //from url you can fetched the uploaded image easily
  //   this.setState({profileImageUrl: url});
  // })
  // .catch((e) => console.log('getting downloadURL of image error => ', e));
  
  const [user, setUser] = useState({});
  const { authUserId } = useContext(AuthContext);
  const profilePicture = user.documents;
  

  return (
    <View>
      <Text>{user.id}</Text>
      {/* <Image style={styles.image} source={{uri: profilePicture}}/> */}
    </View>

  );

};

export default viewFileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  image: {
    margin: 10,
    width: 200,
    height: 200,
    
  },

});