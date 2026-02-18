import React from "react";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-700 py-8 px-4 text-center">
      {/* Email with icon */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <FaEnvelope className="text-cyan-500" />
        <a
          href="mailto:pauljunak@gmail.com"
          className="text-gray-700 dark:text-gray-300 font-medium hover:underline"
        >
          pauljunak@gmail.com
        </a>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
        Freelance Marketplace Project by{" "}
        <span className="font-semibold">Junak Paul</span>
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
