import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import colorDefaults from "../../theme/colorDefaults";
import dateUtility from "../../utilities/dateUtility";

const ChatUserCard = ({ name, messages }) => {
    const latestMessage = (messages.length > 0)
        ? messages.sort((a, b) => a.timestamp - b.timestamp)[0]
        : undefined;

    const fullName = (name.middle)
        ? `${name.first} ${name.middle} ${name.last}`
        : `${name.first} ${name.last}`;

    const getLatestMessage = (latestMessage)
        ? latestMessage?.message
        : "No message";

    const getLatestDate = (latestMessage)
        ? dateUtility.getFormattedDayNow(new Date(latestMessage.timestamp))
        : "-";

    return (
        <TouchableOpacity style={styles.userContainer} activeOpacity={0.5}>
            <View style={styles.leftContainer}>
                <FontAwesome name="user-circle" size={32} color={colorDefaults.primary} />
                <View style={styles.middleContainer}>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.subText}>{getLatestMessage}</Text>
                </View>
            </View>
            <Text style={[styles.date, styles.subText]}>{getLatestDate}</Text>
        </TouchableOpacity>
    )
}

export default ChatUserCard;

const styles = StyleSheet.create({
    userContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 12,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colorDefaults.bottomBorderColor

    },
    leftContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    middleContainer: {
        marginLeft: 8
    },
    name: {
        fontWeight: "bold"
    },
    date: {
        alignSelf: "flex-end"
    },
    subText: {
        fontSize: 12,
        color: "grey"
    }

});