import React from "react";
import { View, StyleSheet } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import NotificationListItem from "./NotificationListItem";
import DeleteFab from "./DeleteFab";

const NotificationScreenView = ({
  notifications,
  notificationClick,
  deleteAllNotifications,
}) => {
  return (
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
  );
};

export default NotificationScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: colorDefaults.backDropColor,
  },
});
