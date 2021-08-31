import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colorDefaults from "../../theme/colorDefaults";

const ChatInputBox = ({ inputMessage, setInputMessage, clear, createMessage }) => {
    return (
        <View style={styles.chatContainer}>
            <TextInput
                style={styles.chatInput}
                placeholder="Write message"
                value={inputMessage}
                onChangeText={setInputMessage}
                multiline
            />
            {inputMessage
                ? <TouchableOpacity activeOpacity={0.5} style={styles.chatButtons} onPress={clear}>
                    <MaterialIcons
                        name="clear"
                        size={24}
                        color={colorDefaults.primary}
                    />
                </TouchableOpacity>
                : <></>
            }
            <TouchableOpacity activeOpacity={0.5} style={styles.chatButtons} onPress={createMessage}>
                <MaterialIcons name="send" size={24} color={colorDefaults.primary} />
            </TouchableOpacity>
        </View>
    )
}

export default ChatInputBox;

const styles = StyleSheet.create({
    chatContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: 12,
        marginTop: 0,
        padding: 12,
        borderWidth: 1,
        borderColor: colorDefaults.primary,
        borderRadius: 10
    },
    chatInput: {
        flex: 1
    },
    chatButtons: {
        marginLeft: 8,
        alignSelf: "flex-end"
    }
});