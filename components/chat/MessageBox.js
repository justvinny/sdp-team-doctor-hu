import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native"
import colorDefaults from "../../theme/colorDefaults"
import dateUtility from "../../utilities/dateUtility";
import AuthContext from "../../context/AuthContext";

const MessageBox = ({ id, name, message, timestamp }) => {
    const { authUserId } = useContext(AuthContext);

    return (
        <View style={authUserId === id ? styles.messageBoxYou : styles.messageBoxOther}>
            <Text style={authUserId === id ? styles.textYou : styles.textOther}>{message}</Text>
            <View style={authUserId === id ? styles.headerContainer : styles.headerContainerOther}>
                <Text style={styles.name}>{authUserId === id ? "You" : name}</Text>
                <Text style={styles.date}>{dateUtility.getFormattedDateNow(new Date(timestamp))}</Text>
            </View>
        </View>
    )
}

export default MessageBox;

const styles = StyleSheet.create({
    messageBoxYou: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        alignSelf: "flex-end",
        marginBottom: 12,
        maxWidth: "80%"
    },
    headerContainer: {
        flexDirection: "row-reverse",
        alignItems: "flex-end"
    },
    headerContainerOther: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    name: {
        fontSize: 14,
        fontWeight: "bold"
    },
    date: {
        marginLeft: 4,
        marginRight: 4,
        fontSize: 12,
        color: "grey"
    },
    textYou: {
        color: "white",
        padding: 12,
        backgroundColor: colorDefaults.primary,
        borderRadius: 10
    },
    messageBoxOther: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "flex-start",
        marginBottom: 12,
        maxWidth: "80%"
    },
    textOther: {
        padding: 12,
        backgroundColor: "white",
        borderRadius: 10,
        color: "black"
    }
});