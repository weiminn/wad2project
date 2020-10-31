import * as firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmZJ4B0b_XffgrNtfP6GT1Kf1yHJvbqPM",
  authDomain: "wad2project-7fc17.firebaseapp.com",
  databaseURL: "https://wad2project-7fc17.firebaseio.com",
  projectId: "wad2project-7fc17",
  storageBucket: "wad2project-7fc17.appspot.com",
  messagingSenderId: "149608517715",
  appId: "1:149608517715:web:55b6af782f69f0152776a6",
  measurementId: "G-V7FE65ZC37"
};

var app = firebase.default.initializeApp(firebaseConfig);

export default app;