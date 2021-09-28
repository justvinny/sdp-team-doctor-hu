import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NotificationListItem from "./NotificationListItem";

const NotificationScreen = ({ user }) => {
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

  const notificationClick = () => {
    window.alert("Clicked!");
  };

  return (
    <View style={styles.container}>
      {mockData.map((notification, index) => {
        return (
          <NotificationListItem
            key={index}
            notification={notification}
            notificationClick={notificationClick}
          />
        );
      })}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
