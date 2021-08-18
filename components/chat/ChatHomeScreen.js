import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import ChatUserCard from "./ChatUserCard";
import { FlatList } from "react-native-gesture-handler";
import firestoreService from "../../firebase/firestoreService";

const ChatHomeScreen = ({ navigation }) => {

    const [data, setData] = useState([]);

    const openSearch = () => {
        navigation.navigate("Search", {
            type: "chat"
        });
    }

    useEffect(() => {
        firestoreService
            .getAllStaff()
            .then(data => setData(data));
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Messages",
            headerRight: () => (
                <TouchableOpacity activeOpacity={0.5} onPress={openSearch}>
                    <AntDesign name="adduser" size={24} color="#fff" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => <ChatUserCard name={item.name} messages={item.messages} />}
                keyExtractor={(item) => item?.id}
            />
        </View>
    )
}

export default ChatHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignContent: "center"
    }
});