import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Square from "./square";
 import LogoutButton from "./logoutButton";
import AuthContext from "../AuthContext"; //to access firestore service, Auth athority
import firestoreService from "../../firebase/firestoreService"; //where you grab information from
import Staff from "../../models/Staff";


export default function Menu({navigation}) {
  const authId = useContext(AuthContext);
  const [user, setUser] = useState({});
  //user.isStaff
  const [loading, setLoading] = useState(true);

  // if use is staff or patient renders correct menu items

  const [names, setName] = useState([
    {iconname:"Profile", icon:"account-circle", route: "StaffProfile"},
    {iconname:"Messages", icon:"message", route: "ChatHome"},
    {iconname:"Settings", icon:"settings", route: ""},
    // {iconname:"Attachments", icon:"attachment"},
    {iconname:"Notifications", icon:"notifications", route: ""},
    {iconname:"Search User", icon:"search", route: "Search"}
  
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
      //only acts if page isnt rendering
      return <></>;
    }

    return (

      
      <View style={styles.container}>

        <View style={styles.topView}>
          <Text style={styles.text}>Welcome back, {Staff.getFullName(user.name)}</Text>
            </View>
          
            {names.map((name, index) => <Square index={index + 1} name={name.iconname} icon={name.icon} navigation={navigation} route={name.route} /> )}

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
    //paddingTop: Platform.OS === "ios" ? 20 : 0,
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
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  topView: {
    width: "100%",
    height: 75,
    left: 0,
    marginBottom: 20,
    backgroundColor: '#FF9800',
    
    justifyContent: "center",
    alignItems: "center",
    // position: "",
    bottom: 0,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  }
});
