import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import NotificationListItem from "./NotificationListItem";
import DeleteFab from "./DeleteFab";
import LoadingScreen from "../LoadingScreen";
import { MaterialIcons } from "@expo/vector-icons";

/*
  View for the notification screen that contains all the UI elements such as
  notifications, delete floating action button, etc.
*/
const NotificationScreenView = ({
  loading,
  notifications,
  notificationClick,
  deleteAllNotifications,
}) => {
  const renderView = () => {
    if (loading) {
      return <LoadingScreen />;
    } else if (!loading && notifications.length == 0) {
      return (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="notifications-none"
            size={50}
            color={colorDefaults.primary}
          />
          <Text style={styles.noNotificationsTxt}>No Notifications</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={({ item, index }) => (
            <NotificationListItem
              index={index}
              notification={item}
              notificationClick={notificationClick}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <DeleteFab deleteAllNotifications={deleteAllNotifications} />
      </View>
    );
  };

  return renderView();
};

export default NotificationScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: colorDefaults.backDropColor,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorDefaults.backDropColor,
  },
  noNotificationsTxt: {
    fontWeight: "bold",
    fontSize: 20,
    color: colorDefaults.primary,
  },
});
