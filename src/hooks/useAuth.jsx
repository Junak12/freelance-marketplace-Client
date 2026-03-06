import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {

    return {
      user: null,
      loading: true,
      loginUser: async () => {},
      signupUser: async () => {},
      loginWithGoogle: async () => {},
      logoutUser: async () => {},
    };
  }

  return context;
};
