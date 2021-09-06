import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import SearchAppBar from "./SearchAppBar";
import { MaterialIcons } from '@expo/vector-icons';
import SearchUserCard from "./SearchUserCard";
import LoadingScreen from "../../Screens/LoadingScreen";
import FilterModal from "./filter/FilterModal";
import Staff from "../../models/Staff";

const SearchUserScreenView = ({
    navigation,
    search,
    setSearch,
    clearSearch,
    getSortedUsers,
    loading,
    type,
    modalFilterVisible,
    closeModalFilter,
    openModalFilter,
    filterSelected,
    setFilterSelected,
    sortSelected,
    setSortSelected,
    sortAscending,
    toggleAscending
}) => {
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
                renderItem={({ item }) => <SearchUserCard navigation={navigation} user={item} type={type} />}
                keyExtractor={item => item.id.toString()}
                style={styles.flatList}
            />
        )
    }

    return (
        < View style={styles.container} >
            <SearchAppBar
                search={search}
                setSearch={setSearch}
                clearSearch={clearSearch}
                sortAscending={sortAscending}
                toggleAscending={toggleAscending}
                openModalFilter={openModalFilter}
                navigation={navigation}
            />
            <FilterModal
                modalFilterVisible={modalFilterVisible}
                closeModalFilter={closeModalFilter}
                filterSelected={filterSelected}
                setFilterSelected={setFilterSelected}
                sortSelected={sortSelected}
                setSortSelected={setSortSelected}
                sortAscending={sortAscending}
                toggleAscending={toggleAscending}
                type={type}
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
    },
    ascendingButton: {
        marginRight: 8
    }
});