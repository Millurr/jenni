import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDyCO2E1Okmz8MYXi4hgJWFbzDV3NgfzAg",
    authDomain: "test-6ee2f.firebaseapp.com",
    databaseURL: "https://test-6ee2f.firebaseio.com",
    projectId: "test-6ee2f",
    storageBucket: "test-6ee2f.appspot.com",
    messagingSenderId: "1089375706705"
  };
  firebase.initializeApp(config);

  //const storage = firebase.storage();

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();