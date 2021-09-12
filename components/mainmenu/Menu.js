import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Square from "./Square";
import LogoutButton from "./LogoutButton";
import AuthContext from "../AuthContext"; //to access firestore service, Auth athority
import firestoreService from "../../firebase/firestoreService"; //where you grab information from
import Staff from "../../models/Staff";
import { auth } from "../../firebase/firebaseConfig";

export default function Menu({ navigation }) {
  const { authUserId, setAuthUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  //user.isStaff
  const [loading, setLoading] = useState(true);

  // if use is staff or patient renders correct menu items

  const [names, setName] = useState([
    { iconname: "Profile", icon: "account-circle", route: "ProfileSelection" },
    { iconname: "Messages", icon: "message", route: "ChatHome" },
    { iconname: "Settings", icon: "settings", route: "" },
    // {iconname:"Attachments", icon:"attachment"},
    { iconname: "Notifications", icon: "notifications", route: "" },
    { iconname: "Search User", icon: "search", route: "Search" },
  ]);

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

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
      return <></>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.text}>
            Welcome back, {Staff.getFullName(user.name)}
          </Text>
        </View>
        {names.map((name, index) => (
          <Square
            key={index + name.route}
            name={name.iconname}
            icon={name.icon}
            navigation={navigation}
            route={name.route}
          />
        ))}
        <View style={styles.bottomView}>
          <LogoutButton signOut={signOut} />
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
    backgroundColor: "#FF9800",

    justifyContent: "center",
    alignItems: "center",
    // position: "",
    bottom: 0,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
});
