// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADL7PZuD7tQ9Wh93UgObXiw0Fjp9AlJ50",
  authDomain: "inicio-sesion-612c7.firebaseapp.com",
  projectId: "inicio-sesion-612c7",
  storageBucket: "inicio-sesion-612c7.appspot.com",
  messagingSenderId: "989397047108",
  appId: "1:989397047108:web:2500e9aba02a93decf6911"
};

const appGithub = initializeApp(firebaseConfig);

const authGithub = getAuth(appGithub);
const providerGithub = new GithubAuthProvider();

const appGoogle = initializeApp(firebaseConfig);

const authGoogle = getAuth(appGoogle);

const providerGoogle = new GoogleAuthProvider();

export {authGoogle, providerGoogle}

export {authGithub, providerGithub}