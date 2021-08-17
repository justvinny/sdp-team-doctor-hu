import React from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBox = ({search, setSearch, clearSearch}) => {

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Ionicons name="search" size={24} color="black" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search User"
                    onChangeText={setSearch}
                    value={search}
                />
                {(search.length > 0)
                    ? <Pressable onPress={clearSearch}>
                        <MaterialIcons
                            name="clear"
                            size={24}
                            color="black"
                        />
                    </Pressable>
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
        backgroundColor: "grey"
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