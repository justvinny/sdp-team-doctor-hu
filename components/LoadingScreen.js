import React from "react"
import { ActivityIndicator, View, StyleSheet } from "react-native"
import colorDefaults from "../theme/colorDefaults"

const LoadingScreen = () => {

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colorDefaults.primary} />
        </View>
    )
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: colorDefaults.backDropColor
    }
});