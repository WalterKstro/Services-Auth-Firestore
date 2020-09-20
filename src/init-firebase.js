import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
  const firebaseConfig = {
   apiKey: "AIzaSyBOZqyhx6MADfOcZ6KPX4j9v_JmVt1TRL4",
   authDomain: "vue-firestore-c0cd2.firebaseapp.com",
   databaseURL: "https://vue-firestore-c0cd2.firebaseio.com",
   projectId: "vue-firestore-c0cd2",
   storageBucket: "vue-firestore-c0cd2.appspot.com",
   messagingSenderId: "827811382741",
   appId: "1:827811382741:web:482ea3947677047ba1a95c",
   measurementId: "G-69EK3LF4N3"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
//  firebase.analytics()

 export const auth = firebase.auth()
 export const db = firebase.firestore()