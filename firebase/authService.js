import { auth } from "./firebaseConfig";

const signUp = async (email, password) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        return console.log(error.message);
    }
}

const signIn = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        return console.log(error.message);
    }
}

const authService = {
    signUp,
    signIn
}

export default authService;