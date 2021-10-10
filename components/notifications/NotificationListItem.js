import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import colorDefaults from '../../theme/colorDefaults'
import dateUtility from '../../utilities/dateUtility'

/*
    Card item that contains information for a single notification. 
    Can be notifications for new messages, results, comments, etc.
*/
const NotificationListItem = ({index, notification, notificationClick}) => {
    return (
        <TouchableOpacity style={[styles.container, notification.isRead && styles.read]} onPress={() => notificationClick(notification, index)}>
            <Text style={styles.title}>New message</Text>
            <Text style={styles.subText} numberOfLines={1}>{notification.content}</Text>
            <Text style={[styles.date, styles.subText]}>{dateUtility.getFormattedDateNow(new Date(notification.timestamp))}</Text>
        </TouchableOpacity>
    )
}

export default NotificationListItem;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        borderBottomWidth: 1,
        padding: 8,
        borderColor: colorDefaults.bottomBorderColor    
    },
    read: {
        backgroundColor: colorDefaults.readBackgroundColor
    }, 
    title: {
        fontWeight: "bold",
        fontSize: 14
    },
    date: {
        alignSelf: "flex-end",
    },
    subText: {
        color: "grey",
        fontSize: 12
    }
})
