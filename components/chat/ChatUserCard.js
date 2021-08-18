import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import colorDefaults from "../../theme/colorDefaults";
import dateUtility from "../../utilities/dateUtility";
import AuthContext from "../AuthContext";

const ChatUserCard = ({ item, navigation }) => {
    const { name, messages } = item;
    const authId = useContext(AuthContext);

    const latestMessage = (messages.length > 0)
        ? messages.sort((a, b) => a.timestamp - b.timestamp)
            .filter(msg => msg.sentBy === authId || msg.sentTo === authId)
            .reverse()[0]
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

    const messageUser = () => {
        navigation.navigate("DirectMessage", { item });
    }

    return (
        <TouchableOpacity style={styles.userContainer} activeOpacity={0.5} onPress={messageUser}>
            <View style={styles.leftContainer}>
                <FontAwesome name="user-circle" size={32} color={colorDefaults.primary} />
                <View style={styles.middleContainer}>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.subText} numberOfLines={1}>{getLatestMessage}</Text>
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
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        padding: 12,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colorDefaults.bottomBorderColor

    },
    leftContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    middleContainer: {
        flex: 1,
        marginLeft: 8,
        marginRight: 8
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