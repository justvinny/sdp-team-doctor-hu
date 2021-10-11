import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Square from "./Square";
import LogoutButton from "./LogoutButton";
import AuthContext from "../../context/AuthContext"; //to access firestore service, Auth athority
import firestoreService from "../../firebase/firestoreService"; //where you grab information from
import Staff from "../../models/Staff";
import { auth } from "../../firebase/firebaseConfig";
import LoadingScreen from "../.././components/LoadingScreen";
import colorDefaults from "../../theme/colorDefaults";
import { StatusBar } from "expo-status-bar";

export default function Menu({ navigation }) {
  const { authUserId, setAuthUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [notificationsBadge, setNotificationsBadge] = useState(0);

  const [menuStaff, setMenuItemsStaff] = useState([
    { iconname: "Profile", icon: "account-circle", route: "ProfileSelection" },
    { iconname: "Messages", icon: "message", route: "ChatHome" },
    { iconname: "Settings", icon: "settings", route: "ChangePassword" },
    {
      iconname: "Notifications",
      icon: "notifications",
      route: "NotificationScreen",
      hasBadge: true,
    },
    { iconname: "Search User", icon: "search", route: "Search" },
  ]);

  const [menuPatient, setMenuItemsPatient] = useState([
    { iconname: "Profile", icon: "account-circle", route: "ProfileSelection" },
    { iconname: "Settings", icon: "settings", route: "ChangePassword" },
    {
      iconname: "Notifications",
      icon: "notifications",
      route: "NotificationScreen",
      hasBadge: true,
    },
    { iconname: "Search User", icon: "search", route: "Search" },
  ]);

  useEffect(() => {
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setIsStaff(data.isStaff);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firestoreService
      .getUserLive(authUserId)
      .onSnapshot((doc) => {
        if (doc.data() && doc.data()?.notifications) {
          const nNotifications = doc
            .data()
            .notifications.filter((notifcation) => !notifcation.isRead).length;
          setNotificationsBadge(nNotifications);
        }
        setLoading(false);
      });

    return unsubscribe;
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
      return <LoadingScreen />;
    }

    //Right now this is the best way to render the screen correctly on the first try
    return (
      <>
        {user.isStaff ? (
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <StatusBar style="auto" />
            <View style={styles.container}>
              <View
                style={[
                  styles.topView,
                  { backgroundColor: colorDefaults.staffTopContainer },
                ]}
              >
                <Text style={styles.text}>
                  Welcome back, {Staff.getFullName(user.name)}{" "}
                </Text>
              </View>
              {menuStaff.map((menuIt, index) => (
                <React.Fragment key={index + menuIt.route}>
                  {menuIt.hasBadge ? (
                    <Square
                      name={menuIt.iconname}
                      icon={menuIt.icon}
                      navigation={navigation}
                      route={menuIt.route}
                      notificationsBadge={notificationsBadge}
                    />
                  ) : (
                    <Square
                      name={menuIt.iconname}
                      icon={menuIt.icon}
                      navigation={navigation}
                      route={menuIt.route}
                    />
                  )}
                </React.Fragment>
              ))}
              <View style={styles.bottomView}>
                <LogoutButton signOut={signOut} />
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView bounces={false}>
            <StatusBar style="auto" />
            <View style={styles.container}>
              <View
                style={[
                  styles.topView,
                  { backgroundColor: colorDefaults.primary },
                ]}
              >
                <Text style={styles.text}>
                  Welcome back, {Staff.getFullName(user.name)}{" "}
                </Text>
              </View>
              {menuPatient.map((menuIt, index) => (
                <React.Fragment key={index + menuIt.route}>
                  {menuIt.hasBadge ? (
                    <Square
                      name={menuIt.iconname}
                      icon={menuIt.icon}
                      navigation={navigation}
                      route={menuIt.route}
                      notificationsBadge={notificationsBadge}
                    />
                  ) : (
                    <Square
                      name={menuIt.iconname}
                      icon={menuIt.icon}
                      navigation={navigation}
                      route={menuIt.route}
                    />
                  )}
                </React.Fragment>
              ))}
              <View style={styles.bottomView}>
                <LogoutButton signOut={signOut} />
              </View>
            </View>
          </ScrollView>
        )}
      </>
    );
  };

  return renderPage();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
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
    paddingTop: 40,
  },
  topView: {
    width: "100%",
    height: 75,
    left: 0,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: colorDefaults.iconColor,
    fontSize: 18,
  },
});
