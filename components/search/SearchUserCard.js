import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SearchUserCard = ({ item, type }) => {
    const fullName = (item.name.middle)
        ? `${item.name.first} ${item.name.middle} ${item.name.last}`
        : `${item.name.first} ${item.name.last}`;

    const getSearchType = () => {
        switch (type) {
            case "chat":
                return <AntDesign name="message1" size={24} color={colorDefaults.primary} />
            default:
                return <MaterialIcons name="person-search" size={24} color={colorDefaults.primary} />
        }
    }

    const getAction = () => {
        switch (type) {
            case "chat":
                console.log("Chat action " + fullName);
                break;
            default:
                console.log("View profile action." + fullName);
        }
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={getAction}>
            <Text>{fullName}</Text>
            {getSearchType()}
        </TouchableOpacity>
    )
}

export default SearchUserCard;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: colorDefaults.bottomBorderColor,
    },
    viewProfileText: {
        color: "#0077cc"
    }
});