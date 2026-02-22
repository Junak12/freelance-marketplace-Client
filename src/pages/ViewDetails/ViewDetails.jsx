import React, { useEffect } from "react";
import { useParams } from "react-router";
import { FaDollarSign, FaClock, FaUserAlt, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";
import { useData } from "../../hooks/useData";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const ViewDetails = () => {
  const instance = useAxios();
  const { id } = useParams();
  const { data, loading } = useData();
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading)
    return <p className="text-center py-20">Loading job details...</p>;

  const job = data.find((j) => j._id === id);

  if (!job)
    return <p className="text-center py-20 text-red-600">Job not found!</p>;

  const handleAcceptTask = async () => {
    try {
      if (user.email === job.userEmail) {
        Swal.fire({
          icon: "warning",
          title: "Cannot Accept",
          text: "You cannot accept your own task.",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      if (job.status !== "Open" && job.status !== "open") {
        Swal.fire({
          icon: "warning",
          title: "Cannot Accept",
          text: "Already Booked.",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }
      await instance.put(`AllJobs/${id}/accept`, {
        acceptedBy: user.email,
        status: "Accepted",
      });

      const acceptedTask = {
        jobId: job._id,
        title: job.title,
        category: job.category,
        budget: job.budget,
        currency: job.currency,
        deadline: job.deadline,

        clientEmail: job.userEmail,
        clientName: job.postedBy,

        freelancerEmail: user.email,

        status: "accepted",
        acceptedAt: new Date(),
      };

      await instance.post("/my-task-collection", acceptedTask);
      
      Swal.fire({
        icon: "success",
        title: "Task Accepted!",
        text: "You have successfully accepted this task.",
        confirmButtonColor: "#06b6d4",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to accept the task. Try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 py-12"
    >
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        <img
          src={job.coverImage}
          alt={job.title}
          className="w-full lg:w-1/2 h-72 sm:h-96 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                <FaDollarSign /> {job.currency} {job.budget}
              </span>
              <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                <FaClock /> {new Date(job.deadline).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                <FaUserAlt /> {job.postedBy}
              </span>
              <span className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium">
                <FaTag /> {job.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Contact Email:
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {job.userEmail}
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mt-3">
              {job.taskDescription}
            </p>
          </div>

          <button
            onClick={handleAcceptTask}
            className="mt-6 w-full lg:w-1/2 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg"
          >
            Accept Task
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Job Details
        </h2>
        <div className="p-6 rounded-2xl  shadow-2xl space-y-4 border-2 border-[#0f546d] dark:border-cyan-400">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Budget:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {job.currency} {job.budget}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Deadline:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(job.deadline).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Category:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{job.category}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Posted By:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{job.postedBy}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewDetails;
