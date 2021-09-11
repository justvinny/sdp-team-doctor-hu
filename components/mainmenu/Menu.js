import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import Square from "./Square";
import LogoutButton from "./LogoutButton";
import AuthContext from "../AuthContext"; //to access firestore service, Auth athority
import firestoreService from "../../firebase/firestoreService"; //where you grab information from
import Staff from "../../models/Staff";
import { auth } from "../../firebase/firebaseConfig";
import LoadingScreen from "../.././Screens/LoadingScreen";

export default function Menu ({ navigation }){
  const { authUserId, setAuthUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  //user.isStaff
  const [loading, setLoading] = useState(true);
  
  //const [names, setName] = useState([]);
  const [menuStaff, setMenuItemsStaff] = useState(
    [ { iconname: "Profile", icon: "account-circle", route: "StaffProfile" },
      { iconname: "Messages", icon: "message", route: "ChatHome" },
      { iconname: "Settings", icon: "settings", route: "" },
      { iconname: "Notifications", icon: "notifications", route: "" },
      { iconname: "Search User", icon: "search", route: "Search" }]
  );


  const [menuPatient, setMenuItemsPatient] = useState([
  { iconname: "Profile", icon: "account-circle", route: "StaffProfile" },
  { iconname: "Settings", icon: "settings", route: "" },
  { iconname: "Notifications", icon: "notifications", route: "" },
  { iconname: "Search User", icon: "search", route: "Search" }]);
 

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      //setMenuItemsStaff(menuItems());
      setLoading(false);
     
    });
  }, []);

 
  // function menuItems() {
    
  //   if (user.isStaff) {
  //     return [ { iconname: "Profile", icon: "account-circle", route: "StaffProfile" },
  //     { iconname: "Messages", icon: "message", route: "ChatHome" },
  //     { iconname: "Settings", icon: "settings", route: "" },
  //     { iconname: "Notifications", icon: "notifications", route: "" },
  //     { iconname: "Search User", icon: "search", route: "Search" }]
  //   }
  //   else{
  //     return [ { iconname: "Profile", icon: "account-circle", route: "StaffProfile" },
  //     { iconname: "Search User", icon: "search", route: "Search" } ]
  //   }
  // }


  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setAuthUserId(undefined);
        navigation.replace("WelcomeScreen");
      })
      .catch((error) => alert(error));
  };


  const renderPage = () => {
    if (loading) {
      // empty component
      //only acts if page isnt rendering
      return <LoadingScreen />;
    }
    // else if (!loading && typeof user.isStaff === 'undefined') {
    //   return <LoadingScreen />;
    // }


    //Right now this is the best way to render the screen correctly on the first try
    //Scroll view needs work, there is a way to make it work but i deleted the code and need to figure it out again
    return (
      <>
      {
        (user.isStaff) 
        ?       
              <View style={styles.container}>

              <View style={[styles.topView, {backgroundColor: '#FF9800'}]}>
                <Text style={styles.text}>Welcome back, {Staff.getFullName(user.name)} </Text>
              </View>
              {menuStaff.map((menuIt, index) => <Square key={index + menuIt.route} name={menuIt.iconname} icon={menuIt.icon} navigation={navigation} route={menuIt.route} />)}
              <View style={styles.bottomView}>
                <LogoutButton signOut={signOut} />
              </View>
            </View>
        : 
            <View style={styles.container}>

            <View style={[styles.topView, {backgroundColor: '#687089'}]}>
              <Text style={styles.text}>Welcome back, {Staff.getFullName(user.name)} </Text>
            </View>
            {menuPatient.map((menuIt, index) => <Square key={index + menuIt.route} name={menuIt.iconname} icon={menuIt.icon} navigation={navigation} route={menuIt.route} />)}
            <View style={styles.bottomView}>
              <LogoutButton signOut={signOut} />
            </View>
            </View>
      }
      </>

      //   <ScrollView>
      //   <View style={styles.container}>

      //   <View style={styles.topView}>
      //     <Text style={styles.text}>Welcome back, {Staff.getFullName(user.name)} </Text>
      //   </View>
      
      //   {menuStaff.map((menuIt, index) => <Square key={index + menuIt.route} name={menuIt.iconname} icon={menuIt.icon} navigation={navigation} route={menuIt.route} />)}
      //   <View style={styles.bottomView}>
      //     <LogoutButton signOut={signOut} />
      //   </View>
      // </View>
      // </ScrollView>
     

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
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    //position: "absolute",
    paddingTop: 40,
  },
  topView: {
    width: "100%",
    height: 75,
    left: 0,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    // position: "",
   // bottom: 0,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  }
});
