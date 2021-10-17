import React from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from "react-native"
import colorDefaults from "../../../theme/colorDefaults";
import RadioButtonGroup from "../../radio/RadioButtonGroup";

const FilterModal = ({
    modalFilterVisible,
    closeModalFilter,
    setFilterSelected,
    setSortSelected,
    type,
    isStaff
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalFilterVisible}
            onRequestClose={closeModalFilter}

        >
            <TouchableOpacity
                onPressOut={closeModalFilter}
                style={styles.overlay}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        {("chat".localeCompare(type) === 0 || (typeof isStaff == "boolean" && !isStaff))
                            ? <></>
                            : <>
                                <Text style={styles.title}>Filter</Text>
                                <View style={styles.section}>
                                    <RadioButtonGroup
                                        radioData={["Both", "Staff Only", "Patient Only"]}
                                        setSelectedValue={setFilterSelected}
                                    />
                                </View>
                            </>
                        }
                        <Text style={styles.title}>Sort</Text>
                        <View style={styles.section}>
                            <RadioButtonGroup
                                radioData={["First Name", "Last Name"]}
                                setSelectedValue={setSortSelected}

                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={closeModalFilter}>
                            <Text style={styles.buttonLabel}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default FilterModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorDefaults.semiOpaqueBlackBackground
    },
    container: {
        minHeight: "30%",
        width: "70%",
        backgroundColor: "#fff",
        alignItems: "flex-start",
        padding: 12,
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    section: {
        margin: 8,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 0,
        alignSelf: "stretch"
    },
    button: {
        backgroundColor: colorDefaults.primary,
        padding: 6,
        marginTop: 8,
        borderRadius: 8,
        alignSelf: "flex-end"
    },
    buttonLabel: {
        color: "#fff",
        fontWeight: "bold"
    }
});