import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import firestoreService from "../../firebase/firestoreService";
import AuthContext from "../../context/AuthContext";
import NotificationScreenView from "./NotificationScreenView";

/*
  Contains all the functionality about the notifications screen. All the firebase API calls,
  state mutation, and functions related to state are located here.
*/
const NotificationScreenController = ({ navigation, route }) => {
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
      .getUserLive(authUserId)
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
    markNotificationRead(index);
    if (notification.type.localeCompare("message") === 0) {
      navigation.navigate("ChatHome");
    } else if (
      notification.type.localeCompare("comment") === 0 ||
      notification.type.localeCompare("comment-reply") === 0
    ) {
      firestoreService.getUserById(notification.patientId).then((user) => {
        navigation.navigate("Comment", { user });
      });
    } else if (notification.type.localeCompare("result") === 0) {
      navigation.navigate("ViewFileScreen");
    } else {
      window.alert("Notification not implemented for this feature.");
    }
  };

  const markNotificationRead = (index) => {
    const copyNotifications = [...notifications];
    copyNotifications[index].isRead = true;
    firestoreService.updateNotifications(
      authUserId,
      copyNotifications.reverse()
    );
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
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              firestoreService.updateNotifications(authUserId, []);
            },
            style: "destructive",
          },
        ]
      );
    } else {
      window.alert("Nothing to delete.");
    }
  };

  return (
    <NotificationScreenView
      loading={loading}
      notifications={notifications}
      notificationClick={notificationClick}
      deleteAllNotifications={deleteAllNotifications}
    />
  );
};

export default NotificationScreenController;
