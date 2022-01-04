import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDE2nb6XWYt3TMizuaJHcYjltVQakFiHfQ",
  authDomain: "chatting-app-f10c8.firebaseapp.com",
  databaseURL: "https://chatting-app-f10c8-default-rtdb.firebaseio.com",
  projectId: "chatting-app-f10c8",
  storageBucket: "chatting-app-f10c8.appspot.com",
  messagingSenderId: "1009572725368",
  appId: "1:1009572725368:web:8ab0987d2303e5ab29a38d"
};


const app  = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
export {db, auth};