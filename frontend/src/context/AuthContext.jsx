import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, logoutAuth, handleRedirectResult } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Handle redirect result first (after Google redirect sign-in)
    handleRedirectResult().then((user) => {
      if (user) setCurrentUser(user);
    });

    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (err) {
      setAuthError(err.message || "Login failed. Please try again.");
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout: logoutAuth, authError, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
