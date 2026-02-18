import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { FaDollarSign, FaClock, FaUserAlt } from "react-icons/fa";
import { useData } from "../../hooks/useData";

const JobCards = ({ limit }) => {
  const {data, loading} = useData();

  const jobs = limit ? data.slice(0, limit) : data;

  return (
    <section className="px-4 sm:px-6 lg:px-24 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-18 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
        Hire Experts. Deliver Exceptional Results. <br />

      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl overflow-hidden border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            {/* Card Image */}
            <div className="h-48 sm:h-56 relative overflow-hidden">
              <img
                src={item.coverImage}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute top-4 left-4 bg-cyan-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                {item.category}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6 space-y-3 bg-gradient-to-r from-white/60 via-white/40 to-white/60 dark:from-slate-950/40 dark:via-cyan-400/10 dark:to-slate-950/40">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                <FaDollarSign /> {item.currency} {item.budget}
              </div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <FaClock /> {new Date(item.deadline).toLocaleDateString()}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {item.taskDescription}
              </p>
            </div>

            {/* Card Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-gray-200/70 dark:border-white/10 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaUserAlt /> {item.postedBy}
              </span>
              <button className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm hover:underline">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobCards;
