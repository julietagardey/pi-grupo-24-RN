import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDYxBhj6NPHyTHH7mdjU86ceCfwNmFZLsU",
    authDomain: "pi-grupo24.firebaseapp.com",
    projectId: "pi-grupo24",
    storageBucket: "pi-grupo24.firebasestorage.app",
    messagingSenderId: "957399018058",
    appId: "1:957399018058:web:90dcc5f9478dfe05e294b3"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();