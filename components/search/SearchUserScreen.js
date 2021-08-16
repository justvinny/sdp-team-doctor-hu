import React, { useState } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import UserCard from "./UserCard";

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
    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search User"
                    onChangeText={setSearch}
                    data={search}
                />
            </View>
            <FlatList
                data={data.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).sort((a,b) => compareByName(a,b))}
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
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: "grey"
    },
    searchInput: {
        alignSelf: "stretch",
        padding: 8,
        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 5

    }
});