import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Badge = ({number}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{number}</Text>
        </View>
    )
}

export default Badge

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#de3535",
        position: "absolute", 
        top: "25%",
        right: "32%"
    },
    text: {
        color: "#fff",
        fontWeight: "bold"
    }
})
