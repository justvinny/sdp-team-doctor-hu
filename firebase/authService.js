import firebase from "./firebase";

const signUp = (email, password) => () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential.user.email);
        }).catch((error) => {
            console.log(error.message);
        });
}

const signIn = (email, password) => () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log(userCredential.user.email + " is logged in.");
        })
        .catch((error) => {
            console.log(error.message);
        });
}

const authService = {
    signUp,
    signIn
}

export default authService;