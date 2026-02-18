import React from "react";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaBullhorn,
  FaRobot,
  FaVideo,
  FaLanguage,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useData } from "../../hooks/useData";


const Icon = {
  "Web Development": <FaLaptopCode />,
  Design: <FaPaintBrush />,
  "Digital Marketing": <FaBullhorn />,
  "Data & AI": <FaRobot />,
  "Mobile Development": <FaLaptopCode />,
  "Content Writing": <FaPaintBrush />,
  "Media & Video": <FaVideo />,
  "Translation & Language": <FaLanguage />,
};


const Colour = {
  "Web Development": "bg-cyan-500",
  Design: "bg-purple-500",
  "Digital Marketing": "bg-pink-500",
  "Data & AI": "bg-green-500",
  "Mobile Development": "bg-yellow-500",
  "Content Writing": "bg-indigo-500",
  "Media & Video": "bg-orange-500",
  "Translation & Language": "bg-rose-500",
};

const Categories = () => {
  const { data, loading } = useData();

  if (loading) {
    return (
      <p className="text-center py-10 font-bold text-pink-700">
        Loading Categories......
      </p>
    );
  }

  if (!data?.length) {
    return (
      <p className="text-center py-10 font-bold text-red-700">
        No Categories found......
      </p>
    );
  }


  const categoryNames = [...new Set(data.map((job) => job.category))];


  const categories = categoryNames.map((name) => ({
    name,
    icon: Icon[name] || <FaLaptopCode />,
    color: Colour[name] || "bg-gray-700",
  }));

  return (
    <section className="px-6 sm:px-10 lg:px-24 py-12">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-16 text-cyan-700 dark:text-pink-400/90">
        Explore by Category
      </h2>

      <div className="flex gap-6 overflow-x-auto scroll-container pb-4 snap-x snap-mandatory">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className={`flex-shrink-0 w-48 sm:w-56 lg:w-64 p-6 rounded-3xl shadow-lg text-white cursor-pointer ${cat.color} hover:shadow-2xl transition-all duration-300 snap-start`}
          >
            <div className="text-4xl mb-4">{cat.icon}</div>
            <h3 className="text-xl font-bold">{cat.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
