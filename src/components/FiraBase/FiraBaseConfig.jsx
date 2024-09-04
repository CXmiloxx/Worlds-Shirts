import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  
  apiKey: 'AIzaSyCZs_z0viShJo46-vYHeL0ngnQCC1lnUmw',
  authDomain: 'worlds-shirts.firebaseapp.com',
  projectId: 'worlds-shirts',
  storageBucket: 'worlds-shirts.appspot.com',
  messagingSenderId: '619836948464',
  appId: '1:619836948464:web:eac7cf2fa889c9b7f2a735'
};



const appGoogle = initializeApp(firebaseConfig);

const db = getFirestore(appGoogle);
const storage = getStorage(appGoogle);
const authGoogle = getAuth(appGoogle);

const providerGoogle = new GoogleAuthProvider();

export { authGoogle, providerGoogle, db, storage };
