import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const JobCards = ({ limit }) => {
  const [data, setData] = useState([]);
  const instance = useAxios();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await instance.get("/AllJobs");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobs();
  }, [instance]);

  const jobs = limit ? data.slice(0, limit) : data;

  return (
    <section
      className="
        relative min-h-screen
        px-5 sm:px-10 lg:px-24 py-16
        flex flex-col
        bg-transparent
      "
    >
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
        Available Tasks
      </h2>

      {/* Job Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((item) => (
          <div
            key={item._id}
            className="
              relative
              rounded-2xl
              overflow-hidden
              shadow-md dark:shadow-lg
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl
              border border-gray-200 dark:border-slate-600
              bg-white/80 dark:bg-white/10
              backdrop-blur-md
            "
          >
            {/* Image with Category Badge */}
            <div className="w-full h-80 overflow-hidden relative">
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Static Category Badge */}
              <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                {item.title}
              </h3>

              {/* Budget */}
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                💰 {item.currency} {item.budget}
              </p>

              {/* Deadline */}
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                ⏰ Deadline: {new Date(item.deadline).toLocaleDateString()}
              </p>

              {/* Task Description Preview */}
              {item.taskDescription && (
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {item.taskDescription}
                </p>
              )}
            </div>

            {/* Footer */}
            <div
              className="
                px-5 py-4 border-t border-gray-200 dark:border-slate-600
                flex items-center justify-between
              "
            >
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Posted by <span className="font-medium">{item.postedBy}</span>
              </p>

              <button
                className="
                  text-sm font-semibold
                  text-cyan-600 dark:text-cyan-400
                  hover:underline
                "
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobCards;
