import { auth } from "./firebaseConfig";
import firestoreService from "./firestoreService";

const signUp = async (email, password, first, middle, last, isStaff) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const id = userCredential.user.uid;

        let successfullyCreated;
        if (newUser.isStaff) {
            successfullyCreated = await firestoreService.createStaff(id, first, middle, last, isStaff);
        } else {
            successfullyCreated = await firestoreService.createPatient(id, first, middle, last, isStaff);
        }

        return successfullyCreated;
    } catch (error) {
        return error.message
    }
}

const signIn = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        return error.message
    }
}

const authService = {
    signUp,
    signIn
}

export default authService;