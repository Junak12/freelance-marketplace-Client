import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Categories from "../../components/Categories/Categories";
import JobCards from "../../components/CardSix/JobCards";
import { useData } from "../../hooks/useData";

const AllJob = () => {
  const { data, loading } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const jobsRef = useRef(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    isFirstMount.current = false;
  }, []);


  useEffect(() => {
    if (!isFirstMount.current && selectedCategory !== "All") {
      jobsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory]);

  if (loading) {
    return <p className="text-center py-20">Loading jobs...</p>;
  }

  const filteredJobs =
    selectedCategory === "All"
      ? data
      : data.filter((job) => job.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <section className="my-6 sm:my-8 md:my-10">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight dark:text-cyan-400 text-cyan-700">
          Explore Job By Categories
        </h2>

        <p className="mt-3 text-sm sm:text-xl font-medium text-fuchsia-500/60 dark:text-gray-400 max-w-2xl">
          Browse jobs by category and find opportunities that perfectly match
          your skills and interests.
        </p>
        <div className="">
          <Categories
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </section>

      <section ref={jobsRef} className="my-12 sm:my-16">
        <h2 className="text-2xl sm:text-4xl font-bold text-cyan-800 dark:text-pink-500 mb-6">
          {selectedCategory === "All"
            ? "Available Jobs"
            : `${selectedCategory} Jobs`}
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found in this category
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCards key={job._id} item={job} />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default AllJob;
