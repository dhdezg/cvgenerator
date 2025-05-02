import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUJSZvibkm5_BtgNMSTv3Mxdr6H0qcj1Y',
  authDomain: 'best-resume-generator.firebaseapp.com',
  projectId: 'best-resume-generator',
  storageBucket: 'best-resume-generator.firebasestorage.app',
  messagingSenderId: '981646240799',
  appId: '1:981646240799:web:f01d7cf11737e9068c792a',
  measurementId: 'G-2BL16JFL1C',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db, googleProvider };
