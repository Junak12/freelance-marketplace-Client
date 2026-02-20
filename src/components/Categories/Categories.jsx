import React from "react";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaBullhorn,
  FaRobot,
  FaVideo,
  FaLanguage,
  
} from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useData } from "../../hooks/useData";

const Icon = {
  "Web Development": <FaLaptopCode />,
  Design: <FaPaintBrush />,
  "Digital Marketing": <FaBullhorn />,
  "Data And AI": <FaRobot />,
  "Mobile Development": <FaLaptopCode />,
  "Content Writing": <FaPaintBrush />,
  "Media & Video": <FaVideo />,
  "Translation & Language": <FaLanguage />,
};

const Colour = {
  "Web Development": "bg-cyan-500",
  Design: "bg-purple-500",
  "Digital Marketing": "bg-pink-500",
  "Data And AI": "bg-green-500",
  "Mobile Development": "bg-yellow-500",
  "Content Writing": "bg-indigo-500",
  "Media & Video": "bg-orange-500",
  "Translation & Language": "bg-rose-500",
};

const Categories = ({ selectedCategory, onSelect }) => {
  const { data, loading } = useData();

  if (loading)
    return <p className="text-center py-10 font-bold text-pink-700">
      Loading Categories...
    </p>;

  const categoryNames = [
    "All",
    ...new Set(data.map(job => job.category)),
  ];

  const categories = categoryNames.map(name => ({
    name,
    icon: Icon[name] || <FaBorderAll/>,
    color: Colour[name] || "bg-pink-700",
  }));

  return (
    <section className="px-6 sm:px-10 lg:px-24 py-12">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {categories.map(cat => (
          <motion.div
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelect(cat.name)}  
            className={`
              flex-shrink-0 w-48 sm:w-56 lg:w-64 p-6 rounded-3xl
              text-white cursor-pointer transition-all duration-300
              ${cat.color}
              ${
                selectedCategory === cat.name
                  ? "ring-4 ring-white/80 scale-105"
                  : "opacity-80 hover:opacity-100"
              }
            `}
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