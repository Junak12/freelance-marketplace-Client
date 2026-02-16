import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { NavLink } from "react-router";
import { LuSunMoon } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [login, setLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [shadow, setShadow] = useState(false);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 10);
    };
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
      className={` px-4 md:px-6 lg:px-16 transition-shadow duration-300 shadow-xl
        ${shadow ? "shadow-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md" : "bg-transparent"}
      `}
    >
      <div className="flex items-center justify-between h-20">
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

        {/* Desktop Menu (lg+) */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={navLinkClass}>
            All Jobs
          </NavLink>
          <NavLink to="/add-job" className={navLinkClass}>
            Add Jobs
          </NavLink>
          <NavLink to="/my-task" className={navLinkClass}>
            My Accepted Task
          </NavLink>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 sm:gap-6">
          <LuSunMoon
            onClick={handleMode}
            className="text-2xl sm:text-3xl text-slate-600 cursor-pointer dark:text-slate-300"
          />

          {!login && (
            <NavLink
              to="/signup"
              className="hidden lg:block text-xl border px-4 py-2 rounded-2xl bg-cyan-700 text-white
              border-cyan-800 hover:scale-105 transition-all font-semibold"
            >
              Sign Up
            </NavLink>
          )}

          {/* Hamburger → Mobile + Tablet */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Menu */}
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
            to="/jobs"
            className={navLinkClass}
          >
            All Jobs
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/add-job"
            className={navLinkClass}
          >
            Add Jobs
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            to="/my-task"
            className={navLinkClass}
          >
            My Accepted Task
          </NavLink>

          {!login && (
            <NavLink
              to="/signup"
              className="text-xl border px-4 py-2 rounded-2xl bg-cyan-700 text-white
              border-cyan-800 hover:scale-105 transition-all font-semibold w-fit"
            >
              Sign Up
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
