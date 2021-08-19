import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import colorDefaults from "../../theme/colorDefaults";
import AuthContext from "../AuthContext";

const ChatUserCard = ({ user, messageUser }) => {
    const authId = useContext(AuthContext);

    return (
        <TouchableOpacity style={styles.userContainer} activeOpacity={0.5} onPress={messageUser(user)}>
            <View style={styles.leftContainer}>
                <FontAwesome name="user-circle" size={32} color={colorDefaults.primary} />
                <View style={styles.middleContainer}>
                    <Text style={styles.name}>{user.getFullName()}</Text>
                    <Text style={styles.subText} numberOfLines={1}>{user.getLatestMessage(authId)}</Text>
                </View>
            </View>
            <Text style={[styles.date, styles.subText]}>{user.getLatestDate(authId)}</Text>
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