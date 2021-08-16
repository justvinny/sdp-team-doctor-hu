import firebase, { db } from "./firebaseConfig";

const COLLECTION_USERS = "users";

// Read operations.
const getAllStaff = async () => {
    try {
        const querySnapshot = await db.collection(COLLECTION_USERS)
            .where("isStaff", "==", true)
            .get();
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        return "Error getting staff: " + error;
    }
}

const getAllPatients = async () => {
    try {
        const querySnapshot = await db.collection(COLLECTION_USERS)
            .where("isStaff", "==", false)
            .get();
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        return "Error getting patients: " + error;
    }
}

// Create operations.
const createPatient = async (id, first, middle, last, isStaff) => {
    const newPatient = {
        id,
        name: {
            first,
            middle,
            last
        },
        isStaff,
        address: {
            street: "",
            suburb: "",
            city: "",
            post: ""
        },
        bloodType: "",
        birthDate: "",
        weight: 0,
        height: 0,
        allergies: [],
        staffNotes: [],
        medicalResults: []
    }

    return await createUser(newPatient);
}

const createStaff = async (id, first, middle, last, isStaff) => {
    const newStaff = {
        id,
        name: {
            first,
            middle,
            last
        },
        isStaff,
        title: "",
        about: "",
        messages: []
    }

    return await createUser(newStaff);
}

/* 
    addUser is a helper method only.
    Use createPatient or createStaff above for the actual account creation.
*/
const createUser = async (newUser) => {
    try {
        const docRef = await db.collection(COLLECTION_USERS)
            .add(newUser);
        return "User successfully added with " + docRef.id;
    } catch (error) {
        return "Error adding user: " + error;
    }
}

// Update operations.
const updateFirstName = async (id, first) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "name.first": first });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateMiddleName = async (id, middle) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "name.middle": middle });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateLastName = async (id, last) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "name.last": last });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateFullName = async (id, name) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ name });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateStreet = async (id, street) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "address.street": street });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateSuburb = async (id, suburb) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "address.suburb": suburb });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateCity = async (id, city) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "address.city": city });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updatePost = async (id, post) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ "address.post": post });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateFullAddress = async (id, address) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ address });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}


const updateBirthDate = async (id, birthDate) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ birthDate });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateBloodtype = async (id, bloodType) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ bloodType });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateHeight = async (id, height) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ height });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateWeight = async (id, weight) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ weight });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateAllergies = async (id, allergies) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ allergies });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateMedicalResults = async (id, medicalResults) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ medicalResults });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateStaffNotes = async (id, staffNotes) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ staffNotes });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateAbout = async (id, about) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ about });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const updateTitle = async (id, title) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ title });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const addStaffNote = async (id, note) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ staffNotes: firebase.firestore.FieldValue.arrayUnion(note) });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const addAllergy = async (id, allergy) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ allergies: firebase.firestore.FieldValue.arrayUnion(allergy) });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const addMedicalResult = async (id, medicalResult) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ medicalResults: firebase.firestore.FieldValue.arrayUnion(medicalResult) });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}

const addMessage = async (id, message) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ messages: firebase.firestore.FieldValue.arrayUnion(message) });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
}


// Delete operations.
const deleteUser = async (userId) => {
    try {
        await db.collection("users")
            .doc(userId)
            .delete();
        return "User successfully deleted.";
    } catch (error) {
        return "Error removing User: " + error;
    }
}

const firestoreService = {
    getAllStaff,
    getAllPatients,
    addUser: createUser,
    createPatient,
    createStaff,
    updateAbout,
    updateFullAddress,
    updateStreet,
    updateSuburb,
    updateCity,
    updatePost,
    updateAllergies,
    updateBirthDate,
    updateBloodtype,
    updateHeight,
    updateMedicalResults,
    updateFullName,
    updateFirstName,
    updateMiddleName,
    updateLastName,
    updateStaffNotes,
    updateTitle,
    updateWeight,
    addStaffNote,
    addAllergy,
    addMedicalResult,
    addMessage,
    deleteUser
}

export default firestoreService;