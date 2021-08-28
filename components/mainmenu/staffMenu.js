import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Square from "./square";
import LogoutButton from "./logoutButton";
import AuthContext from "../AuthContext"; //to access firestore service, Auth athority
import firestoreService from "../../firebase/firestoreService"; //where you grab information from
import Staff from "../../models/Staff";

export default function StaffMenu() {
  const authId = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  // if use is staff or patient renders correct menu items
  const [names, setName] = useState([
    "Profile",
    "Messages",
    "Settings",
    "Attachments",
    "Notifications",
    "Search User",
  ]);

  useEffect(() => {
    firestoreService.getUserById(authId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const renderPage = () => {
    if (loading) {
      // empty component
      return <></>;
    }

    return (

      
      <View style={styles.container}>
        <Text>{Staff.getFullName(user.name)}</Text>
      
        {names.map((name, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <Square index={index + 1} name={name} />
            </View>
          );
        })}

      

        <View style={styles.bottomView}>
          <LogoutButton />
        </View>
      </View>
    );
  };

  return renderPage();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1fa",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    //padding: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  item: {
    padding: 20,
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomView: {
    width: "100%",
    height: 100,
    left: 0,
    //backgroundColor: '#FF9800',
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});
