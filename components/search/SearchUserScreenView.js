import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SearchBox from "./SearchBox";

const SearchUserScreenView = ({ search, setSearch, clearSearch, getSortedUsers, renderUser }) => (
    < View style={styles.container} >
        <SearchBox
            search={search}
            setSearch={setSearch}
            clearSearch={clearSearch}
        />
        <FlatList
            data={getSortedUsers()}
            renderItem={renderUser}
            keyExtractor={item => item.id.toString()}
        />
    </View >
)


export default SearchUserScreenView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
});