  import* as firebase from 'firebase'
  
  const settings = {timestampsInSnapshots: true}
     
     
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAxcjgaYVOnANmfOewIpJxVlyhBVkzhMQU",
    authDomain: "webappussh.firebaseapp.com",
    databaseURL: "https://webappussh.firebaseio.com",
    projectId: "webappussh",
    storageBucket: "webappussh.appspot.com",
    messagingSenderId: "68911637712",
    appId: "1:68911637712:web:844f40b9d40bbcbfa6ead5",
    measurementId: "G-5MB03BWT50"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export const db = firebase.firestore();

  export default firebase;