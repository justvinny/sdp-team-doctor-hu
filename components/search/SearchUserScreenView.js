import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import SearchBox from "./SearchBox";
import { MaterialIcons } from '@expo/vector-icons';
import SearchUserCard from "./SearchUserCard";
import LoadingScreen from "../../Screens/LoadingScreen";

const SearchUserScreenView = ({ navigation, search, setSearch, clearSearch, getSortedUsers, loading, type }) => {

    const renderPage = () => {
        if (loading) {
            return <LoadingScreen />
        } else if (!loading && getSortedUsers().length === 0) {
            return (
                <>
                    <MaterialIcons name="person" size={60} color={colorDefaults.primary} style={styles.center} />
                    <Text style={styles.noUsersTxt}>No users</Text>
                </>
            )
        }

        return (
            <FlatList
                data={getSortedUsers()}
                renderItem={({item}) => <SearchUserCard navigation={navigation} user={item} type={type}/>}
                keyExtractor={item => item.id.toString()}
                style={styles.flatList}
            />
        )
    }

    return (
        < View style={styles.container} >
            <SearchBox
                search={search}
                setSearch={setSearch}
                clearSearch={clearSearch}
            />
            {renderPage()}
        </View >
    )
}

export default SearchUserScreenView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colorDefaults.backDropColor
    },
    center: {
        marginTop: "40%"
    },
    noUsersTxt: {
        fontWeight: "bold",
        fontSize: 20,
        color: colorDefaults.primary
    },
    flatList: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: colorDefaults.backDropColor
    }
});