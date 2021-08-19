import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import MessageBox from "./MessageBox";
import ChatInputBox from "./ChatInputBox";

const DirectMessageScreenView = ({ userMessages, inputMessage, setInputMessage, clear, createMessage, name }) => {

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

export default DirectMessageScreenView;

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
