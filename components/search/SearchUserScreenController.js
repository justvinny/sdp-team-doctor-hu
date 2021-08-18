import React, { useContext, useEffect, useState } from "react";
import firestoreService from "../../firebase/firestoreService";
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

    const getSortedUsers = () => {
        return users.filter(user => {
            if (authId == user.id) return false;
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
