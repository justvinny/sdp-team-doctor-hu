import { LogBox } from "react-native";
import { db } from "./firebaseConfig"

LogBox.ignoreLogs(['Setting a timer']);

// Read operations.
const getAllStaff = async () => {
    try {
        const querySnapshot = await db.collection("sample")
            .get();
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        return "Error getting staff: " + error;
    }
}

const getAllPatients = async () => {
    try {
        const querySnapshot = await db.collection("patient")
            .get();
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        return "Error getting patients: " + error;
    }
}

// Add operations.
const addStaff = async (newStaff) => {
    try {
        const docRef = await db.collection("staff")
            .add(newStaff);
        return "Staff successfully added with " + docRef.id;
    } catch (error) {
        return "Error adding staff: " + error;
    }
}

const addPatient = async (newPatient) => {
    try {
        const docRef = await db.collection("patient")
            .add(bad);
        return "Patient successfully added with " + docRef.id;
    } catch (error) {
        return "Error adding patient: " + error;
    }
}

// Update operations.

// Delete operations.
const deleteStaff = async (staffId) => {
    try {
        await db.collection("staff")
            .doc(staffId)
            .delete();
        return "Staff successfully deleted.";
    } catch (error) {
        return "Error removing staff: " + error;
    }
}

const deletePatient = async (patientId) => {
    try {
        await db.collection("patient")
            .doc(patientId)
            .delete();
        return "Patient successfully deleted.";
    } catch (error) {
        return "Error removing patient: " + error;
    }
}

const firestoreService = {
    getAllStaff,
    getAllPatients,
    addStaff,
    addPatient,
    deleteStaff,
    deletePatient
}

export default firestoreService;