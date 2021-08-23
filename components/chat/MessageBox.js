import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native"
import colorDefaults from "../../theme/colorDefaults"
import AuthContext from "../AuthContext";

const MessageBox = ({ id, name, message }) => {
    const { authUserId } = useContext(AuthContext);

    return (
        <View style={authUserId === id ? styles.messageBoxYou : styles.messageBoxOther}>
            <Text>{authUserId === id ? "You" : name}</Text>
            <Text style={authUserId === id ? styles.textYou : styles.textOther}>{message}</Text>
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