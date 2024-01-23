import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBKPZfyj5nrSTVWC9fI3vhMB4sjfhlkPNY",
  authDomain: "connectme-330c4.firebaseapp.com",
  projectId: "connectme-330c4",
  storageBucket: "connectme-330c4.appspot.com",
  messagingSenderId: "806518815932",
  appId: "1:806518815932:web:152ed3585d4d4c7ccb24b9",
  measurementId: "G-NTVY2PTXZ7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);