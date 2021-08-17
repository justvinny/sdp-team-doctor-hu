import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import SearchBox from "./SearchBox";

const SearchUserScreenView = ({ search, setSearch, clearSearch, getSortedUsers, renderUser, loading, setLoading }) => (
    < View style={styles.container} >
        <SearchBox
            search={search}
            setSearch={setSearch}
            clearSearch={clearSearch}
        />
        {
            (loading)
                ? <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
                : <FlatList
                    data={getSortedUsers()}
                    renderItem={renderUser}
                    keyExtractor={item => item.id.toString()}
                />
        }
    </View >
)


export default SearchUserScreenView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "30%"
    }
});