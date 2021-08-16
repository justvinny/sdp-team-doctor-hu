import React, { useState } from "react";
import { View, FlatList, TextInput, StyleSheet, Text, Pressable } from "react-native";
import UserCard from "./UserCard";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from "expo-constants";

const SearchUserScreen = () => {
    const [data, setData] = useState([
        {
            id: 1,
            name: "John Smith"
        },
        {
            id: 2,
            name: "James Armstrong"
        },
        {
            id: 3,
            name: "Michelle Donut"
        },
        {
            id: 4,
            name: "Vanessa Porkchop"
        },
        {
            id: 5,
            name: "Luke Chicken"
        },
        {
            id: 6,
            name: "John Smith"
        },
        {
            id: 7,
            name: "James Armstrong"
        },
        {
            id: 8,
            name: "Michelle Donut"
        },
        {
            id: 9,
            name: "Vanessa Porkchop"
        },
        {
            id: 10,
            name: "Luke Chicken"
        },
        {
            id: 11,
            name: "John Smith"
        },
        {
            id: 12,
            name: "James Armstrong"
        },
        {
            id: 13,
            name: "Michelle Donut"
        },
        {
            id: 14,
            name: "Vanessa Porkchop"
        },
        {
            id: 15,
            name: "Luke Chicken"
        },
        {
            id: 16,
            name: "John Smith"
        },
        {
            id: 17,
            name: "James Armstrong"
        },
        {
            id: 18,
            name: "Michelle Donut"
        },
        {
            id: 19,
            name: "Vanessa Porkchop"
        },
        {
            id: 20,
            name: "Luke Chicken"
        },
    ]);
    const [search, setSearch] = useState("");

    const renderUser = ({ item }) => {
        return <UserCard name={item.name} />
    }

    const compareByName = (a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    }

    const clearSearch = () => {
        setSearch("");
    }

    return (
        <>
            <View style={styles.container}>
                <Ionicons
                    style={styles.arrowBack}
                    name="arrow-back"
                    size={32}
                    color="#fff"
                />
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={24} color="grey" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search User"
                        onChangeText={setSearch}
                        value={search}
                    />
                    <Pressable onPress={clearSearch}>
                        <MaterialIcons name="clear" size={24} color="grey" />
                    </Pressable>
                </View>
            </View>
            <FlatList
                data={data.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => compareByName(a, b))}
                renderItem={renderUser}
                keyExtractor={item => item.id.toString()}
            />

        </>
    )
}

export default SearchUserScreen;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: Constants.statusBarHeight,
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
        padding: 8,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 5,
        minWidth: 0,
        overflow: "hidden"
    },
    searchInput: {
        flex: 1
    },
    arrowBack: {
        margin: 8,
        marginBottom: 12,
        marginRight: 0
    }
});