import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBtscIwboeV6-teOW3SX6YVUgxGoB5SGMg",
    authDomain: "crud-operation-63a8c.firebaseapp.com",
    databaseURL: "https://crud-operation-63a8c-default-rtdb.firebaseio.com",
    projectId: "crud-operation-63a8c",
    storageBucket: "crud-operation-63a8c.appspot.com",
    messagingSenderId: "651378745140",
    appId: "1:651378745140:web:fd1b111d5abb1a2f4bcf61"
};
  // Initialize Firebase
const fireDatabase = firebase.initializeApp(firebaseConfig);

// const fireDatabase = firebaseDB.database().ref();

export default fireDatabase;
