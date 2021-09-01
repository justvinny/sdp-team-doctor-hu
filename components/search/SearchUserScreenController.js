import React, { useContext, useEffect, useState } from "react";
import firestoreService from "../../firebase/firestoreService";
import Staff from "../../models/Staff";
import AuthContext from "../AuthContext";
import SearchUserScreenView from "./SearchUserScreenView";

const SearchUserScreenController = ({ navigation, route }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [filterSelected, setFilterSelected] = useState("");
    const [sortSelected, setSortSelected] = useState("");
    const [sortAscending, setAscending] = useState(true);

    const type = (route.params) ? route.params.type : "none";
    const authId = useContext(AuthContext);
    useEffect(() => {
        console.log("called");
        firestoreService.getAllUsers()
            .then(data => setUsers(data))
            .then(() => setLoading(false));
    }, []);

    const getSortedUsers = () => {
        const sortedUsers = users
            .filter(user => authId !== user.id)
            .filter(user => Staff.getFullName(user.name).toLowerCase().includes(search.toLowerCase()))
            .filter(filterUserType)
            .sort(sortName);

        if (sortAscending) return sortedUsers;
        else return sortedUsers.reverse();
    }

    const sortName = (userA, userB) => {
        switch (sortSelected) {
            case "Last Name":
                return userA.name.last.localeCompare(userB.name.last);
            default:
                return userA.name.first.localeCompare(userB.name.first);
        }
    }

    const filterUserType = (user) => {
        switch (filterSelected) {
            case "Both":
                return user;
            case "Patient Only":
                return !user.isStaff;
            default:
                return user.isStaff;
        }
    }

    const clearSearch = () => {
        setSearch("");
    }

    const [modalFilterVisible, setModalFilterVisible] = useState(false);

    const closeModalFilter = () => {
        setModalFilterVisible(false);
    }

    const openModalFilter = () => {
        setModalFilterVisible(true);
    }

    const toggleAscending = () => {
        setAscending(!sortAscending);
    }

    return (
        <SearchUserScreenView
            navigation={navigation}
            search={search}
            setSearch={setSearch}
            clearSearch={clearSearch}
            getSortedUsers={getSortedUsers}
            loading={loading}
            setLoading={setLoading}
            type={type}
            modalFilterVisible={modalFilterVisible}
            closeModalFilter={closeModalFilter}
            openModalFilter={openModalFilter}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            sortSelected={sortSelected}
            setSortSelected={setSortSelected}
            sortAscending={sortAscending}
            toggleAscending={toggleAscending}
        />
    )
}

export default SearchUserScreenController;
