import React from "react";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaBullhorn,
  FaRobot,
  FaVideo,
  FaLanguage,
} from "react-icons/fa";
import { useData } from "../../hooks/useData";

const ICONS = {
  "Web Development": <FaLaptopCode />,
  Design: <FaPaintBrush />,
  "Digital Marketing": <FaBullhorn />,
  "Data And AI": <FaRobot />,
  "Mobile Development": <FaLaptopCode />,
  "Content Writing": <FaPaintBrush />,
  "Media & Video": <FaVideo />,
  "Translation & Language": <FaLanguage />,
};

const Categories = ({ selectedCategory, onSelect }) => {
  const { data, loading } = useData();

  if (loading) {
    return (
      <p className="text-center py-6 text-sm font-medium text-gray-500">
        Loading categories...
      </p>
    );
  }

  const categoryNames = ["All", ...new Set(data.map((job) => job.category))];

  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-3">
        {categoryNames.map((name) => {
          const active = selectedCategory === name;

          return (
            <button
              key={name}
              onClick={() => onSelect(name)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                border transition-all duration-300
                ${
                  active
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-md"
                    : " text-gray-700 border-2 dark:text-gray-300 border-gray-300 dark:border-gray-950 hover:border-cyan-500 hover:text-cyan-600"
                }
              `}
            >
              {name !== "All" && (
                <span className="text-base">{ICONS[name]}</span>
              )}
              {name}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
