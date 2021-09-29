import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import firestoreService from "../../firebase/firestoreService";
import AuthContext from "../../context/AuthContext";
import Staff from "../../models/Staff";
import DirectMessageScreenView from "./DirectMessageScreenView";

const DirectMessageScreenController = ({ navigation, route }) => {
    // States
    const [inputMessage, setInputMessage] = useState("");
    const [userMessages, setUserMessages] = useState([]);
    const { authUserId } = useContext(AuthContext);
    const user = Staff.staffFirestoreFactory(route.params?.user);
    const name = user.name.first;
    const id = user.id

    // Set title to full name of perso you're chatting with.
    useLayoutEffect(() => {
        navigation.setOptions({
            title: user.getFullName()
        })
    }, [navigation, route]);

    // Get message records for the person you're chatting with.
    useEffect(() => {
        const unsubscribe = firestoreService
            .getAllUsersLive(authUserId)
            .onSnapshot(doc => {
                if (doc.data()) {
                    const msgs = doc.data().messages
                        .filter(msg => msg.sentTo === id || msg.sentBy === id)
                        .filter(msg => msg.sentTo === authUserId || msg.sentBy === authUserId)
                        .reverse();
                    setUserMessages(msgs);
                }
            });

        return unsubscribe;
    }, []);

    // Clear send chat input box.
    const clear = () => {
        setInputMessage("");
    }

    // Send the message and save it to the firestore server.
    const createMessage = () => {
        const newMessage = {
            sentBy: authUserId,
            sentTo: id,
            message: inputMessage,
            timestamp: Date.now()
        }

        const newNotification = {
            type: "message",
            content: inputMessage,
            isRead: false,
            timestamp: newMessage.timestamp
        }

        if (inputMessage) {
            clear();

            // Record messages on both accounts involved.
            firestoreService.addMessage(authUserId, newMessage);
            firestoreService.addMessage(newMessage.sentTo, newMessage);

            // Add notification
            firestoreService.addNotification(newMessage.sentTo, newNotification);
        }
    }

    return (
        <DirectMessageScreenView
            userMessages={userMessages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            clear={clear}
            createMessage={createMessage}
            name={name}
        />
    )
}

export default DirectMessageScreenController;
