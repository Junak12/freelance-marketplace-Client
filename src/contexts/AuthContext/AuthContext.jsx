import React, { createContext, useEffect, useState } from "react";
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

  const storeUserInDB = async (firebaseUser) => {
    if (!firebaseUser) return;

    try {
      const token = await firebaseUser.getIdToken();


      const updatePayload = { token };

      console.log("Updating user token in DB:", updatePayload);

      await instance.patch(`/users/${firebaseUser.email}`, updatePayload);

      console.log("User token updated successfully");
    } catch (error) {
      console.error("Error storing user:", error.message);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  const loginUser = async (email, password) => {
    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(auth, email, password);

      await storeUserInDB(result.user);

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


      await updateProfile(result.user, { displayName: name });
      await result.user.reload();


      const token = await result.user.getIdToken();
      const newUser = {
        name: name,
        email: result.user.email,
        image: result.user.photoURL || "",
        token: token,
      };
      await instance.put(`/users/${result.user.email}`, newUser);

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
      setLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);


      const token = await result.user.getIdToken();

      const userPayload = {
        email: result.user.email,
        token,
      };

      await instance.patch(`/users/${result.user.email}`, userPayload);

      Swal.fire("Success", "Logged in with Google", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
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
