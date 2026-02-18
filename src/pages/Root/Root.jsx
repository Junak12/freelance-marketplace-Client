import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";

const Root = () => {
  return (
    <div
      className="
        min-h-screen
        px-2 py-2 md:px-3 md:py-3 lg:px-4 lg:py-4

        /* LIGHT MODE */
        bg-gradient-to-b
        from-white
        via-[#d4f8fd]
        to-white

        /* DARK MODE */
        dark:bg-gradient-to-b
        dark:from-slate-800
        dark:via-cyan-800
        dark:to-slate-950

        transition-colors duration-700
      "
    >

      <div className="fixed top-0 left-0 w-full z-50 lg:py-3">
        <Navbar />
      </div>


      <main className="pt-24">
        <Outlet />
      </main>


      <Footer />
    </div>
  );
};

export default Root;
