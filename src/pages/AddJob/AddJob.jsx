import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const AddJob = () => {
  const { user } = useAuth();
  const instance = useAxios();

  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [deadline, setDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      postedBy,
      category,
      summary,
      coverImage,
      budget,
      currency,
      deadline,
      taskDescription,
      userEmail: user?.email || "anonymous",
      status: "open",
      acceptedBy: null,
    };

    try {
      const res = await instance.post("/addjobs", jobData);

      Swal.fire({
        icon: "success",
        title: "Job Posted!",
        text: "Your job has been successfully added.",
        timer: 2000,
        showConfirmButton: false,
      });

      setTitle("");
      setPostedBy("");
      setCategory("");
      setSummary("");
      setCoverImage("");
      setBudget("");
      setCurrency("USD");
      setDeadline("");
      setTaskDescription("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to post job. Please try again!",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-cyan-700 dark:text-cyan-400">
          Add New Job
        </h2>
        <p className="mt-2 text-slate-600 dark:text-gray-400 text-sm">
          Fill in the details below to publish a new job listing
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-8 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg"
      >
        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Job Information
          </h3>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Front-end Developer"
              className="w-full p-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Posted By
            </label>
            <input
              type="text"
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
              placeholder="Company or Your Name"
              className="w-full p-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Web Development"
              className="w-full p-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Short Summary
            </label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Build responsive websites using React.js"
              className="w-full p-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Budget & Media
          </h3>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
                Budget
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="500"
                className="w-full p-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 rounded-xl border bg-white text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
              >
                <option value="USD">USD</option>
                <option value="BDT">BDT</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Timeline & Description
          </h3>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Deadline
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 rounded-xl border bg-white text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium dark:text-cyan-400">
              Task Description
            </label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={5}
              placeholder="Describe the task in detail..."
              className="w-full p-3 rounded-xl border resize-none bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white font-semibold bg-cyan-600 hover:bg-cyan-700 transition-all duration-200"
        >
          Post Job
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AddJob;
