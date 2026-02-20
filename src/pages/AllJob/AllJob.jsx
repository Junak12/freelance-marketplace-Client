import React, { useEffect } from "react";
import JobCards from "../../components/CardSix/JobCards";
import Categories from "../../components/Categories/Categories";
import { motion } from "framer-motion";
import { useData } from "../../hooks/useData";

const AllJob = () => {
  const {data} = useData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <section className="my-6 sm:my-8 md:my-10">
        <h2
          className="
          text-2xl sm:text-4xl 
          font-bold text-cyan-800 dark:text-pink-500
        "
        >
          Explore Job By Categories
        </h2>

        <p
          className="
          mt-3 text-sm sm:text-xl font-medium 
          text-fuchsia-500/60 dark:text-gray-400 
          max-w-full sm:max-w-2xl
        "
        >
          Browse jobs by category and find opportunities that perfectly match
          your skills and interests.
        </p>

        <div className="md:-ml-24 mt-6 sm:mt-8">
          <Categories />
        </div>
      </section>
      <section className="my-12 sm:my-16 md:my-20">
        <div className="mb-6 sm:mb-8">
          <h2
            className="
            text-2xl sm:text-4xl 
            font-bold text-cyan-800 dark:text-pink-500
          "
          >
            Available Jobs
          </h2>

          <p
            className="
            mt-3 text-sm sm:text-xl font-medium 
            text-fuchsia-500/60 dark:text-gray-400 
            max-w-full sm:max-w-2xl
          "
          >
            Discover the latest job postings from top clients and start building
            your career today.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-8 ">
          {data.map((job) => (
            <div key={job._id}>
              <JobCards item={job} />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default AllJob;
