import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colorDefaults from "../../theme/colorDefaults";

const SearchBox = ({search, setSearch, clearSearch}) => {

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Ionicons name="search" size={24} color={colorDefaults.primary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search User"
                    onChangeText={setSearch}
                    value={search}
                />
                {(search.length > 0)
                    ? <TouchableOpacity onPress={clearSearch} activeOpacity={0.5}>
                        <MaterialIcons
                            name="clear"
                            size={24}
                            color={colorDefaults.primary}
                        />
                    </TouchableOpacity>
                    : <></>
                }
            </View>
        </View>
    )
}

export default SearchBox;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        backgroundColor: colorDefaults.primary
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        padding: 12,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 5,
        minWidth: 0,
        overflow: "hidden"
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        marginRight: 8
    }
});