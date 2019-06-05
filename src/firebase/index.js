import firebase from "firebase/app";
import "firebase/firestore";
import { AppEnv } from "../store/modules/common/appenv";

//console.log(process.env);
//console.log("env", AppEnv);
const firebaseConfig = {
  apiKey: AppEnv.FIREBASE_API_KEY,
  authDomain: AppEnv.FIREBASE_AUTH_DOMAIN,
  databaseURL: AppEnv.FIREBASE_DATABASE_URL,
  projectId: AppEnv.FIREBASE_PROJECT_ID,
  storageBucket: AppEnv.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: AppEnv.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;
