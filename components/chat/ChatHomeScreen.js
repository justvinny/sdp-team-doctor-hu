import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ChatUserCard from "./ChatUserCard";
import { FlatList } from "react-native-gesture-handler";
import firestoreService from "../../firebase/firestoreService";
import colorDefaults from "../../theme/colorDefaults";
import AuthContext from "../AuthContext";

const ChatHomeScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [staff, setStaff] = useState([]);
    const authId = useContext(AuthContext);

    const openSearch = () => {
        navigation.navigate("Search", {
            type: "chat"
        });
    }

    // Realtime staff data from firestore.
    // Only grab staff that have messages related to logged in user.
    useEffect(() => {
        const unsubscribe = firestoreService
            .getAllStaffLive()
            .onSnapshot((querySnapshot) => {
                const staffWithMessage = querySnapshot.docs.map(doc => doc.data())
                    .filter(staff => {
                        if (staff.messages.length === 0) {
                            return false;
                        } else if (staff.id === authId) {
                            return false;
                        }

                        return staff.messages.find(message => message.sentTo === authId
                            || message.sentBy === authId);
                    });
                setStaff(staffWithMessage);
                setLoading(false);
            });

        return unsubscribe;
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

    const renderPage = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={colorDefaults.primary} style={styles.center} />
        } else if (!loading && staff.length == 0) {
            return (
                <>
                    <MaterialIcons name="message" size={50} color={colorDefaults.primary} style={styles.center} />
                    <Text style={styles.noMsgTxt}>No messages</Text>
                </>
            )
        }

        return (
            <FlatList
                data={staff}
                renderItem={({ item }) => <ChatUserCard item={item} navigation={navigation} />}
                keyExtractor={(item) => item?.id}
                style={styles.flatList}
            />
        )
    }

    return (
        <View style={styles.container}>
            {renderPage()}
        </View>
    )
}

export default ChatHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    center: {
        marginTop: "60%"
    },
    noMsgTxt: {
        fontWeight: "bold",
        fontSize: 20,
        color: colorDefaults.primary
    },
    flatList: {
        flex: 1,
        alignSelf: "stretch"
    }
});