import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import NotificationListItem from "./NotificationListItem";
import firestoreService from "../../firebase/firestoreService";
import AuthContext from "../../context/AuthContext";
import LoadingScreen from "../LoadingScreen";
import DeleteFab from "./DeleteFab";

const NotificationScreen = ({ navigation, route }) => {
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

  // Clicking notification navigates it to the appropriate screen. It also marks it as read.
  // For example, clicking a new message notification will send you to the chat home screen.
  const notificationClick = (notification, index) => {
    if (notification.type.localeCompare("message") === 0) {
      const copyNotifications = [...notifications];
      copyNotifications[index].isRead = true;
      firestoreService.updateNotifications(
        authUserId,
        copyNotifications.reverse()
      );
      navigation.navigate("ChatHome");
    } else {
      window.alert("Non-message notification");
    }
  };

  // Clear all notifications
  // Prompts the user for confirmation to account for user error.
  const deleteAllNotifications = () => {
    if (notifications.length != 0) {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want do delete all notifications?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: () => {
              firestoreService.updateNotifications(authUserId, []);
            },
          },
        ]
      );
    } else {
      window.alert("Nothing to delete.");
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
          <DeleteFab deleteAllNotifications={deleteAllNotifications} />
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
