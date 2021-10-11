// // import React, { useContext } from "react";
// // import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// // import { FontAwesome } from '@expo/vector-icons';
// // import colorDefaults from "../../theme/colorDefaults";
// // import AuthContext from "../../context/AuthContext";
// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from "react-native";
// import AuthContext from "../../context/AuthContext";
// import firestoreService from "../../firebase/firestoreService";
// import LoadingScreen from "../LoadingScreen";
// import { WebView} from "react-native-webview";
// import dateUtility from "../../utilities/dateUtility";
// import UploadDocsHomeScreen from "../../components/documentUpload/UploadedDocsHomeScreen";
// import colorDefaults from "../../theme/colorDefaults";
// import { ListItem, Avatar } from 'react-native-elements'
// import { MaterialIcons, AntDesign } from '@expo/vector-icons';


// const DocumentCard = ({ docs}) => {
//     const [documents, setDocuments] = useState(docs);
    

//     // return (
//     //     <TouchableOpacity style={styles.userContainer} activeOpacity={0.5} >
//     //         <View style={styles.container}>
//     //             {
//     //             documents.map((l, i) => (
//     //                 <ListItem key={i} bottomDivider style={styles.container}>
//     //                 <ListItem.Content>
//     //                     <ListItem.Title style={styles.name}>{l.title}</ListItem.Title>
//     //                     <ListItem.Subtitle  style={styles.subText}>{l.patientId}</ListItem.Subtitle>
//     //                 </ListItem.Content>
//     //                 <Text style={[styles.date, styles.subText]}>{dateUtility.getFormattedDateNow(new Date(l.timestamp))}</Text>
//     //                 </ListItem>
//     //             ))
//     //             }
//     //         </View>
//     //     </TouchableOpacity>
//     // )
//     return (
//         <TouchableOpacity style={styles.userContainer} activeOpacity={0.5} >
//             <Text>Tet</Text>
//             <View style={styles.leftContainer}>
//                 <FontAwesome name="user-circle" size={32} color={colorDefaults.primary} />
//                 <View style={styles.middleContainer}>
//                     <Text style={styles.name}>{documents.title}</Text>
//                     {/* <Text style={styles.subText} numberOfLines={1}>{user.getLatestMessage(authUserId)}</Text> */}
//                 </View>
//             </View>
//             {/* <Text style={[styles.date, styles.subText]}>{user.getLatestDate(authUserId)}</Text> */}
//         </TouchableOpacity>
//     )
// }

// export default DocumentCard;

// const styles = StyleSheet.create({
//     userContainer: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         alignSelf: "stretch",
//         padding: 12,
//         paddingTop: 16,
//         paddingBottom: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: colorDefaults.bottomBorderColor

//     },
//     leftContainer: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "flex-start",
//         alignItems: "center"
//     },
//     middleContainer: {
//         flex: 1,
//         marginLeft: 8,
//         marginRight: 8
//     },
//     name: {
//         fontWeight: "bold"
//     },
//     date: {
//         alignSelf: "flex-end"
//     },
//     subText: {
//         fontSize: 12,
//         color: "grey"
//     }

// });