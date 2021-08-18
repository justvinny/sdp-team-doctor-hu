import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import MessageBox from "./MessageBox";
import ChatInputBox from "./ChatInputBox";
import firestoreService from "../../firebase/firestoreService";
import AuthContext from "../AuthContext";

const DirectMessageScreen = ({ navigation, route }) => {

    const [inputMessage, setInputMessage] = useState("");
    const [userMessages, setUserMessages] = useState([]);
    const authId = useContext(AuthContext);
    const name = route.params?.item?.name?.first;
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: name
        })
    }, [navigation, route]);

    useEffect(() => {
        const unsubscribe = firestoreService
            .getLiveMessages(authId)
            .onSnapshot(doc => {
                if (doc.data())
                    setUserMessages(doc.data().messages.reverse());
            });

        return unsubscribe;
    }, []);

    const clear = () => {
        setInputMessage("");
    }

    const createMessage = () => {
        const newMessage = {
            sentBy: authId,
            sentTo: route.params.item.id,
            message: inputMessage,
            timestamp: Date.now()
        }

        clear();

        // Record messages on both accounts involved.
        firestoreService.addMessage(authId, newMessage);
        firestoreService.addMessage(newMessage.sentTo, newMessage);
    }

    return (
        <View style={styles.container}>
            <View style={styles.messagesContainer}>
                <FlatList
                    data={userMessages}
                    renderItem={({ item }) => <MessageBox id={item.sentBy} name={name} message={item.message} />}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={userMessages}
                    inverted
                    style={styles.flatList}
                />
            </View>
            <ChatInputBox
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                clear={clear}
                createMessage={createMessage}
            />
        </View>
    )
}

export default DirectMessageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: colorDefaults.backDropColor
    },
    messagesContainer: {
        flex: 1,
        padding: 12,
        paddingBottom: 0,
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    flatList: {
        alignSelf: "stretch"
    }
});