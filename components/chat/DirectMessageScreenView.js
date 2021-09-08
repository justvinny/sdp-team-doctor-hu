import React from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import MessageBox from "./MessageBox";
import ChatInputBox from "./ChatInputBox";

const DirectMessageScreenView = ({ userMessages, inputMessage, setInputMessage, clear, createMessage, name }) => {

    const renderChildren = () => (
        <>
            <View style={styles.messagesContainer}>
                <FlatList
                    data={userMessages}
                    renderItem={({ item }) => <MessageBox id={item.sentBy} name={name} message={item.message} timestamp={item.timestamp}/>}
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
        </>
    )
    return (
        <>
            {Platform.OS === "ios"
                ? <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    keyboardVerticalOffset={80}
                >
                    {renderChildren()}
                </KeyboardAvoidingView>
                : <View style={styles.container}>
                    {renderChildren()}
                </View>}
        </>
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
