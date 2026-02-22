import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { NavLink, useNavigate } from "react-router";
import { LuSunMoon } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-xl font-semibold border px-3 py-1 rounded-2xl transition-all
     ${
       isActive
         ? "text-cyan-950 underline underline-offset-8 dark:text-cyan-400"
         : "text-cyan-600 hover:text-cyan-950 hover:scale-105 dark:text-gray-300 dark:hover:text-white"
     }`;

  return (
    <nav
      className={`px-4 md:px-6 lg:px-16 transition-shadow duration-300 shadow-xl
        ${
          shadow
            ? "shadow-md border-b border-b-gray-500 dark:border-b-slate-700 backdrop-blur-md"
            : "bg-transparent"
        }
      `}
    >
      <div className="flex items-center justify-between h-24">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl"
            src={Logo}
            alt="Logo"
          />
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-700 dark:text-cyan-400">
              Freelance
            </h1>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-pink-600 dark:text-red-400">
              MarketPlace
            </h1>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/AllJob" className={navLinkClass}>
            All Jobs
          </NavLink>
          <NavLink to="/addjobs" className={navLinkClass}>
            Add Jobs
          </NavLink>
          <NavLink to="/my-accepted-task" className={navLinkClass}>
            My Accepted Task
          </NavLink>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 relative">
          <LuSunMoon
            onClick={handleMode}
            className="text-2xl sm:text-3xl text-slate-600 cursor-pointer dark:text-slate-300"
          />

          {user ? (
            <div className="relative group hidden lg:block">
              <img
                src={user.photoURL || "https://i.ibb.co.com/q3kx0fGL/ava.png"}
                alt="User"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full border-2 border-cyan-600 cursor-pointer object-cover"
              />

              <div
                className="absolute right-0 top-14 opacity-0 group-hover:opacity-100 transition-all
                              bg-black text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap"
              >
                {user.displayName || "User"}
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hidden lg:block text-xl border px-4 py-2 rounded-2xl bg-cyan-700 text-white
              border-cyan-800 hover:scale-105 transition-all font-semibold"
            >
              Login
            </NavLink>
          )}

          {user && (
            <button
              onClick={async () => {
                await logoutUser();
                navigate("/");
              }}
              className="hidden lg:block text-xl border px-4 py-2 rounded-2xl bg-red-600 text-white
              hover:scale-105 transition-all font-semibold"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden absolute top-full right-0 flex flex-col items-end gap-4 p-4
                        bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md z-50 rounded-b-2xl"
        >
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/AllJob"
            className={navLinkClass}
          >
            All Jobs
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/addjobs"
            className={navLinkClass}
          >
            Add Jobs
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/my-accepted-task"
            className={navLinkClass}
          >
            My Accepted Task
          </NavLink>

          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || "https://i.ibb.co.com/q3kx0fGL/ava.png"}
                className="w-10 h-10 rounded-full border"
                alt="User"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-semibold dark:text-white">
                {user.displayName || "User"}
              </span>
            </div>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="text-xl border px-4 py-2 rounded-2xl bg-cyan-700 text-white font-semibold"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={async () => {
                await logoutUser();
                setMenuOpen(false);
                navigate("/");
              }}
              className="text-xl border px-4 py-2 rounded-2xl bg-red-600 text-white font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
