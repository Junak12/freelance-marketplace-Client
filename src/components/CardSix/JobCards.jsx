import React from "react";
import { FaDollarSign, FaClock, FaUserAlt } from "react-icons/fa";

const JobCards = ({ item }) => {
  if (!item) return null;

  return (
    <div
      className="
        rounded-3xl overflow-hidden border-2 border-gray-300 dark:border-slate-600
        flex flex-col z-30
        h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px]
        transition-all duration-300 ease-in-out
        hover:shadow-2xl hover:scale-105
      "
    >
      <div
        className="
          relative overflow-hidden flex-shrink-0
          h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px]
        "
      >
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-4 left-4 bg-cyan-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
          {item.category}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-3 flex-1 overflow-hidden">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
          <FaDollarSign /> {item.currency} {item.budget}
        </div>

        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
          <FaClock /> {new Date(item.deadline).toLocaleDateString()}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
          {item.taskDescription}
        </p>
      </div>

      <div className="px-4 sm:px-6 py-3 border-t border-gray-300 dark:border-gray-600 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <FaUserAlt /> {item.postedBy}
        </span>
        <button className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm hover:underline">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default JobCards;
