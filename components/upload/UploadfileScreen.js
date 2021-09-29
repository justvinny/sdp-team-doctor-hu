// import React in our code
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, LogBox, Button } from 'react-native';

//Import ActionButton
import ActionButton from 'react-native-action-button';

//Import Icon for the ActionButton
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import colorDefaults from '../../theme/colorDefaults';
import { auth, storage } from './firebase/firebaseConfig';

const App = () => {

    //remove warning `useNativeDriver` was not specified
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const [image, setImage] = useState("");

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
    
      const upload = async () => {
        if (image) {
          try {
            const childPath = `profile/${Math.random().toString(36)}`;
            const response = await fetch(image);
            const blob = await response.blob();
            const task = await storage
              .ref()
              .child(childPath)
              .put(blob);
    
            task.ref.getDownloadURL().then(url => alert(url));
          } catch (error) {
            alert(error.message);
          }
        }
      }
    
      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          Example of Floating Action Button
          with Multiple Option in React Native
        </Text>
        <Text style={styles.textStyle}>
          Click on Action Button to see Alert
          <Button color={colorDefaults.primary} onPress={imagePicker} title="File Picker" />
          <Button color={colorDefaults.primary} onPress={upload} title="Upload Image" />
          {image ? <Image style={{ width: 200, height: 400 }} source={{ uri: image }} /> : <></>}
        </Text>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          {/*Inner options of the action button*/}
          {/*Icons here
             https://infinitered.github.io/ionicons-version-3-search/
           */}
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Add to Watch Later"
            onPress={() => alert('Added to watch later')}>
            <Icon
              name="md-eye"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Add to Favourite"
            onPress={() => alert('Added to favourite')}>
            <Icon
              name="md-star"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Share"
            onPress={() => alert('Share Post')}>
            <Icon
              name="md-share"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});