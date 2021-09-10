import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colorDefaults from "../../theme/colorDefaults";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";

const SearchAppBar = ({ search, setSearch, clearSearch, sortAscending, toggleAscending, openModalFilter, navigation }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
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
            <TouchableOpacity style={styles.ascendingButton} activeOpacity={0.5} onPress={toggleAscending}>
                {sortAscending
                    ? <FontAwesome name="sort-alpha-asc" size={24} color="#fff" />
                    : <FontAwesome name="sort-alpha-desc" size={24} color="#fff" />
                }
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={openModalFilter}>
                <FontAwesome name="filter" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchAppBar;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colorDefaults.primary,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: Constants.statusBarHeight
    },
    searchBox: {
        flex: 1,
        flexDirection: "row",
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
    },
    ascendingButton: {
        marginRight: 8
    }
});