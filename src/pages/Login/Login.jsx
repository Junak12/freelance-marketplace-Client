import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, signupUser, loginWithGoogle } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await loginUser(email, password);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1200,
          showConfirmButton: false,
        });
      } else {
        await signupUser(name, email, password);

        Swal.fire({
          icon: "success",
          title: "Account Created",
          text: "Welcome aboard!",
          timer: 1200,
          showConfirmButton: false,
        });
      }

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1200);

      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error?.message || "Something went wrong",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();

      Swal.fire({
        icon: "success",
        title: "Logged in with Google",
        timer: 1200,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1200);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error?.message || "Try again",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen -mt-10 px-4">
      <div className="w-full max-w-md border-1 border-cyan-400 rounded-2xl shadow-2xl p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">
              {isLogin ? "Login" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:text-white"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:text-white"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl border dark:bg-gray-700 dark:text-white"
              />

              <button
                type="submit"
                className={`w-full py-3 rounded-xl text-white font-semibold ${
                  isLogin
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="my-5 text-center text-gray-400">or</div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaGoogle />
              {isLogin ? "Login with Google" : "Sign up with Google"}
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-cyan-500 font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
