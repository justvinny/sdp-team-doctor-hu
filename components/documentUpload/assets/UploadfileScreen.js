// // import React in our code
// import React, { useEffect, useState, useContext } from "react";

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   LogBox,
//   Button,
//   Image,
// } from "react-native";

// //Import Icon for the ActionButton
// import * as ImagePicker from "expo-image-picker";
// import colorDefaults from "../../theme/colorDefaults";
// import { storage } from "../../firebase/firebaseConfig";
// import AuthContext from "../../context/AuthContext";
// import firestoreService from "../../firebase/firestoreService";
// import { FAB } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const App = () => {
//   const { authUserId } = useContext(AuthContext);

//   //remove warning `useNativeDriver` was not specified
//   useEffect(() => {
//     LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
//   }, []);

//   const [image, setImage] = useState("");

//   const imagePicker = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const upload = async () => {
//     if (image) {
//       try {
//         const childPath = `document/${authUserId}/${authUserId}`;
//         const response = await fetch(image);
//         const blob = await response.blob();
//         const task = await storage.ref().child(childPath).put(blob);

//         task.ref
//           .getDownloadURL()
//           .then((url) => firestoreService.addStaffDoc(authUserId, url));

//         //firestoreService.addStaffDoc(authUserId, url);
//         //firestoreService.addMedicalResult(patirntID, url);
//       } catch (error) {
//         alert(error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <Text style={styles.titleStyle}></Text>
//         <Text style={styles.textStyle}>
//           <Button
//             color={colorDefaults.primary}
//             onPress={imagePicker}
//             title="File Picker"
//           />
//           <Button
//             color={colorDefaults.primary}
//             onPress={upload}
//             title="Upload Image"
//           />
//           {image ? (
//             <Image
//               style={{ width: 200, height: 400 }}
//               source={{ uri: image }}
//             />
//           ) : (
//             <></>
//           )}
//         </Text>
//         <FAB  placement="right" size="large" 
//         icon={{
//             name: "file-upload",
//             size: 25,
//             color: "white"
//             }}
//           onPress={() => console.log("hello")} 
//           />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 10,
//   },
//   titleStyle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 10,
//   },
//   textStyle: {
//     fontSize: 16,
//     textAlign: "center",
//     padding: 10,
//   },
//   icon: {
//     position: "absolute",
//     alignSelf: "center",
//     marginTop: 50,
//   },
// });
