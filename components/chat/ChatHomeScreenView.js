import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import ChatUserCard from "./ChatUserCard";
import { FlatList } from "react-native-gesture-handler";
import colorDefaults from "../../theme/colorDefaults";
import LoadingScreen from "../../Screens/LoadingScreen";

const ChatHomeScreenView = ({ navigation, loading, staff, openSearch, messageUser }) => {

    // Modify app header.
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

    // Conditionally render between loading, empty, and not empty.
    const renderPage = () => {
        if (loading) {
            return <LoadingScreen />
        } else if (!loading && staff.length === 0) {
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
                renderItem={({ item }) => <ChatUserCard user={item} messageUser={messageUser} />}
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

export default ChatHomeScreenView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colorDefaults.backDropColor
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
        alignSelf: "stretch",
        backgroundColor: colorDefaults.backDropColor
    }
});