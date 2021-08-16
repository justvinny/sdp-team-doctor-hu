import React, { useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet, Text, Pressable } from "react-native";
import UserCard from "./UserCard";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from "expo-constants";
import firestoreService from "../../firebase/firestoreService";

const SearchUserScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        firestoreService.getAllStaff()
            .then(data => setUsers(data));
    });

    const renderUser = ({ item }) => {
        return (item.name) ? <UserCard name={item.name} /> : <></>;
    }

    const getSortedUsers = () => {
        return users.filter(user => {
            const fullName = getFullName(user);

            return fullName.toLowerCase().includes(search.toLowerCase());
        })
            .sort((userA, userB) => {
                const fullNameA = getFullName(userA);
                const fullNameB = getFullName(userB);

                return compareByName(fullNameA, fullNameB);
            });
    }

    const getFullName = (user) => {
        return (user.name.middle)
            ? `${user.name.first} ${user.name.middle} ${user.name.last}`
            : `${user.name.first} ${user.name.last}`;

    }

    const compareByName = (nameA, nameB) => {
        nameA = nameA.toLowerCase();
        nameB = nameB.toLowerCase();
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

    const back = () => {
        // TODO
    }

    return (
        <>
            <View style={styles.container}>

                <Pressable onPress={back}>
                    <Ionicons
                        style={styles.arrowBack}
                        name="arrow-back"
                        size={32}
                        color="#fff"
                    />
                </Pressable>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={24} color="grey" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search User"
                        onChangeText={setSearch}
                        value={search}
                    />
                    <Pressable onPress={clearSearch}>
                        <MaterialIcons
                            name="clear"
                            size={24}
                            color="grey"
                        />
                    </Pressable>
                </View>
            </View>
            <FlatList
                data={getSortedUsers()}
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