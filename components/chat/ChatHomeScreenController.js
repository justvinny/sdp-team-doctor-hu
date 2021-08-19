import React, { useContext, useEffect, useState } from "react";
import firestoreService from "../../firebase/firestoreService";
import Staff from "../../models/Staff";
import AuthContext from "../AuthContext";
import ChatHomeScreenView from "./ChatHomeScreenView";

const ChatHomeScreenController = ({ navigation }) => {
    // State
    const [loading, setLoading] = useState(true);
    const [staff, setStaff] = useState([]);
    const authId = useContext(AuthContext);

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
                    })
                    .map(staff => Staff.staffFirestoreFactory(staff));
                setStaff(staffWithMessage);
                setLoading(false);
            });

        return unsubscribe;
    }, []);

    // Navigate to Search screen and pass type of chat to let it know of the origin of the event.
    const openSearch = () => {
        navigation.navigate("Search", {
            type: "chat"
        });
    }

    // Navigate to direct message screen while passing selected user's information as data.
    const messageUser = (user) => () => {
        navigation.navigate("DirectMessage", { user });
    }

    return (
        <ChatHomeScreenView
            navigation={navigation}
            loading={loading}
            staff={staff}
            openSearch={openSearch}
            messageUser={messageUser}
        />
    )
}

export default ChatHomeScreenController;