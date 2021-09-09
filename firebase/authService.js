import { auth } from "./firebaseConfig";

const signIn = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        return error.message
    }
}

const authService = {
    signIn
}

export default authService;