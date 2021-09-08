import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colorDefaults from "../../theme/colorDefaults";

const RadioButton = ({ label, index, selected, selectCurrent, setSelectedValue }) => {

    selected === index && useEffect(() => {
        setSelectedValue(label);
    }, []);

    return (
        <View style={styles.radioContainer}>
            <Text>{label}</Text>
            <TouchableOpacity style={styles.radioButtonContainer} activeOpacity={1} onPress={selectCurrent(index)}>
                {selected === index && <View style={styles.radioButton} />}
            </TouchableOpacity>
        </View>
    )
}

export default RadioButton;

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: colorDefaults.bottomBorderColor,
        borderBottomWidth: 1,
        marginBottom: 8
    },
    radioButtonContainer: {
        marginLeft: 8,
        width: 22,
        height: 22,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colorDefaults.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8
    },
    radioButton: {
        backgroundColor: colorDefaults.primary,
        width: 16,
        height: 16,
        borderRadius: 9,
        borderWidth: 1,
    }
});