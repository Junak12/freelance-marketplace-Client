import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../firebase.init";
import useAxios from "../../hooks/useAxios";

export const AuthContext = createContext(null);



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const instance = useAxios();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);


    if (currentUser) {
      const UserInformation = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        image: currentUser?.photoURL,
        token: currentUser?.accessToken,
      };
      instance.post("/users", UserInformation);
    }
    });


    return unsubscribe;
  }, []);

  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire("Success", "Logged in successfully", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (name, email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      Swal.fire("Success", "Account created successfully", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      Swal.fire("Success", "Logged in with Google", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      Swal.fire("Success", "Logged out successfully", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        signupUser,
        loginWithGoogle,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
