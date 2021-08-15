import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

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

export default firebase;