import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.cofig";

const initializeAuth = () => {
  return initializeApp(firebaseConfig);
};

export default initializeAuth;
