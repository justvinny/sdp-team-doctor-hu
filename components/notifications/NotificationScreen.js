import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import NotificationListItem from "./NotificationListItem";
import firestoreService from "../../firebase/firestoreService";
import AuthContext from "../../context/AuthContext";
import LoadingScreen from "../LoadingScreen";

const NotificationScreen = ({ navigation, route }) => {
  const mockData = [
    {
      type: "message",
      isRead: false,
      content:
        "Realllyyyyyyyyyyyyyy long messageeeeeeeeeeeeeeeeeeee. hahahaahhaha. Please click!!!!!!!!!!!",
      timestamp: 1631615638522,
    },
    {
      type: "message",
      isRead: true,
      content: "Read message.",
      timestamp: 1631622022767,
    },
  ];

  // States
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUserId } = useContext(AuthContext);

  // Header bar title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Notifications",
    });
  }, [navigation, route]);

  // Get notifications
  useEffect(() => {
    const unsubscribe = firestoreService
      .getAllUsersLive(authUserId)
      .onSnapshot((doc) => {
        if (doc.data() && doc.data()?.notifications) {
          const _notifications = doc.data().notifications.reverse();
          setNotifications(_notifications);
        }
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const notificationClick = (notification, index) => {
    if (notification.type.localeCompare("message") === 0) {
      const copyNotifications = [...notifications];
      copyNotifications[index].isRead = true;
      firestoreService.updateNotifications(authUserId, copyNotifications.reverse());
      navigation.navigate("ChatHome");
    } else {
      window.alert("Non-message notification");
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          {notifications.map((notification, index) => {
            return (
              <NotificationListItem
                key={index}
                index={index}
                notification={notification}
                notificationClick={notificationClick}
              />
            );
          })}
        </View>
      )}
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: colorDefaults.backDropColor,
  },
});
