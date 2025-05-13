import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebaseConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {},
    workExperience: [],
    skills: [],
    studies: [],
    languages: [],
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // If user is logged in, try to retrieve Firebase data
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const firebaseData = userSnap.data().data;
            // Merge Firebase and localStorage data if exists
            const localData = JSON.parse(
              localStorage.getItem('formData') || '{}'
            );
            setFormData({
              ...localData,
              ...firebaseData,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        // If there is no user logged in, use localStorage data
        const localData = JSON.parse(localStorage.getItem('formData') || '{}');
        setFormData(localData);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle user registration
  const register = async (email, password) => {
    setAuthError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      // Save user to Firestore
      await saveUserToFirestore(userCredential.user);

      return { success: true, message: 'verification_email_sent' };
    } catch (err) {
      setAuthError(err.code || err.message);
      return { success: false, error: err.code || err.message };
    }
  };

  // Handle email/password login
  const login = async (email, password) => {
    setAuthError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user to Firestore
      await saveUserToFirestore(userCredential.user);

      return { success: true };
    } catch (err) {
      setAuthError(err.code || err.message);
      return { success: false, error: err.code || err.message };
    }
  };

  // Handle Google login
  const loginWithGoogle = async () => {
    setAuthError('');
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);

      // Save user to Firestore
      await saveUserToFirestore(userCredential.user);

      return { success: true };
    } catch (err) {
      setAuthError(err.code || err.message);
      return { success: false, error: err.code || err.message };
    }
  };

  // Save user data to Firestore
  const saveUserToFirestore = async (user) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
        data: {},
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear form data or load from localStorage after logout
      const localData = JSON.parse(localStorage.getItem('formData') || '{}');
      setFormData(localData);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const saveFormData = async (data, section) => {
    const processedData =
      section === 'workExperience' && !Array.isArray(data) ? [data] : data;

    const newFormData = {
      ...formData,
      [section]: processedData,
    };

    // Save always in localStorage
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));

    // Only if user is logged in, save in Firebase
    if (auth.currentUser) {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        const existingData = docSnap.exists() ? docSnap.data().data || {} : {};
        const updatedData = {
          ...existingData,
          [section]: processedData,
        };
        await setDoc(userRef, { data: updatedData }, { merge: true });
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    }
  };

  const clearFormData = () => {
    const emptyData = {
      personalInfo: {},
      workExperience: [],
      skills: [],
      studies: [],
      languages: [],
    };
    setFormData(emptyData);
    localStorage.removeItem('formData');
  };

  const clearAuthError = () => {
    setAuthError('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        formData,
        loading,
        authError,
        login,
        register,
        loginWithGoogle,
        logout,
        saveFormData,
        clearFormData,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
