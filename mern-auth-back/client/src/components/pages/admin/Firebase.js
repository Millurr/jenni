import firebase from 'firebase'
require('dotenv').config();

const config = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "test-6ee2f.firebaseapp.com",
    databaseURL: "https://test-6ee2f.firebaseio.com",
    projectId: "test-6ee2f",
    storageBucket: "test-6ee2f.appspot.com",
    messagingSenderId: "1089375706705"
  };
  firebase.initializeApp(config);

  //const storage = firebase.storage();

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();