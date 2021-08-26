import React, { useContext, useEffect, useState } from "react";
import firestoreService from "../../firebase/firestoreService";
import Staff from "../../models/Staff";
import AuthContext from "../AuthContext";
import SearchUserScreenView from "./SearchUserScreenView";

const SearchUserScreenController = ({ navigation, route }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const type = (route.params) ? route.params.type : "none";
    const authId = useContext(AuthContext);
    useEffect(() => {
        firestoreService.getAllStaff()
            .then(data => setUsers(data))
            .then(() => setLoading(false));
    }, []);

    const getSortedUsers = () => users
        .filter(user => authId !== user.id
            && Staff.getFullName(user.name).toLowerCase().includes(search.toLowerCase()))
        .sort((userA, userB) => Staff.getFullName(userA.name).localeCompare(Staff.getFullName(userB.name)));

    const clearSearch = () => {
        setSearch("");
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
        />
    )
}

export default SearchUserScreenController;
