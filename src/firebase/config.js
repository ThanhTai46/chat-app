import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCbfRfwfodVyxf2D_YMp3cp5-Xyi53JMc",
  authDomain: "chat-app-65.firebaseapp.com",
  projectId: "chat-app-65",
  storageBucket: "chat-app-65.appspot.com",
  messagingSenderId: "837598899091",
  appId: "1:837598899091:web:b7befb0e5ecefcd2d51666",
  measurementId: "G-ZDQ1V0NQGQ",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// s
export { db, auth };
export default firebase;
