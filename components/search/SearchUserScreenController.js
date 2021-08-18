import React, { useEffect, useState } from "react";
import SearchUserCard from "./SearchUserCard";
import firestoreService from "../../firebase/firestoreService";
import SearchUserScreenView from "./SearchUserScreenView";

const SearchUserScreenController = ({ navigation, route }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const type = (route.params) ? route.params.type : "none";

    useEffect(() => {
        firestoreService.getAllStaff()
            .then(data => setUsers(data))
            .then(() => setLoading(false));
    }, []);

    const renderUser = ({ item }) => {
        return (item) ? <SearchUserCard item={item} type={type}/> : <></>;
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

    return (
        <SearchUserScreenView
            search={search}
            setSearch={setSearch}
            clearSearch={clearSearch}
            getSortedUsers={getSortedUsers}
            renderUser={renderUser}
            loading={loading}
            setLoading={setLoading}
            type={type}
        />
    )
}

export default SearchUserScreenController;
