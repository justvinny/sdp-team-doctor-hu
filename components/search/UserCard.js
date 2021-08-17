import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserCard = ({ name }) => {
    const fullName = (name.middle)
        ? name.first + " " + name.middle + " " + name.last
        : name.first + " " + name.last;

    return (
        <View style={styles.container}>
            <Text>{fullName}</Text>
            <Text style={styles.viewProfileText}>View Profile</Text>
        </View>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    viewProfileText: {
        color: "#0077cc"
    }
});