// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAMTIsrqbnhrn03AzYDWSiY3m4P0YG4ywE",
  authDomain: "facialattendance-react.firebaseapp.com",
  projectId: "facialattendance-react",
  storageBucket: "facialattendance-react.appspot.com",
  messagingSenderId: "856831999279",
  appId: "1:856831999279:web:c46c8145cdab0a4072f5da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
