import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import { LogBox } from "react-native";

// Ignore setting a timer warning. 
// Comment out this line when using the expo web as it crashes the app.
// Works fine as is though when using expo android/IOS.
LogBox.ignoreLogs(['Setting a timer']);

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtb_V0qVKuyrnPf60GGPrfDoduHmvd3kU",
    authDomain: "sdp-team-doctor-hu.firebaseapp.com",
    projectId: "sdp-team-doctor-hu",
    storageBucket: "sdp-team-doctor-hu.appspot.com",
    messagingSenderId: "293085614889",
    appId: "1:293085614889:web:8df7ce008386c21d7f9d38"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export {
  db,
  auth
}
export default firebase;
