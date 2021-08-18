import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SearchUserCard = ({ navigation, item, type }) => {
    const { name } = item;

    const fullName = (name.middle)
        ? `${name.first} ${name.middle} ${name.last}`
        : `${name.first} ${name.last}`;

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
                navigation.replace("DirectMessage", { item })
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
    }
});