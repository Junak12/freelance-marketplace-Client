import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAddedTask } from "../../hooks/useAddedTask";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { useData } from "../../hooks/useData";
import { Link } from "react-router";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const MyAddedTask = () => {
  const { fetcAddedhData, addedTasks } = useAddedTask();
  const { fetchData } = useData();;
  const instance = useAxios();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = async (id) => {
    const taskId =
      typeof id === "object" ? id.$oid || id.toString() : id.toString();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await instance.delete(`my-added-jobs/${taskId}`, {
        headers: { "Content-Type": "application/json" },
      });
      fetchData();
      fetcAddedhData();
      const deletedCount = res?.data?.deletedCount ?? 0;

      if (deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your task has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Task could not be deleted.",
        });
      }
    } catch (err) {
      console.error("Delete error:", err.response || err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold dark:text-pink-500 text-gray-800">
          My Added Tasks
        </h2>

        <Link
          to={"/addjobs"}
          className="px-4 py-2 text-md cursor-pointer font-bold rounded-md border bg-cyan-800 border-gray-300 text-white hover:border-gray-400 hover:scale-105 transition"
        >
          Add New Task
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left">
          <thead className="border border-cyan-400 text-lg dark:text-white">
            <tr>
              <th className="px-5 py-3 font-medium">Title</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Budget</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {addedTasks.map((job) => (
              <tr
                key={
                  typeof job._id === "object"
                    ? job._id.$oid || job._id.toString()
                    : job._id.toString()
                }
                className="border border-cyan-400 text-md text-slate-500 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                <td className="px-5 py-4">{job.title}</td>
                <td className="px-5 py-4">{job.category}</td>
                <td className="px-5 py-4">${job.budget}</td>
                <td className="px-5 py-4">{job.status}</td>
                <td className="px-5 py-4 text-right space-x-3">
                  <Link
                    to={`/my-added-jobs/${job._id}`}
                    className="bg-cyan-700 text-white px-3 py-1 cursor-pointer rounded-xl hover:scale-105 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-white bg-red-700 px-3 py-1 cursor-pointer rounded-xl hover:scale-105 transition-all"
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyAddedTask;
