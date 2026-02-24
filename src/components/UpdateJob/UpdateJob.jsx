import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { useAddedTask } from "../../hooks/useAddedTask";
import { useData } from "../../hooks/useData";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const instance = useAxios();
  const { fetcAddedhData } = useAddedTask();
  const { fetchData } = useData();

  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({
    title: "",
    category: "",
    budget: "",
    status: "open",
    summary: "",
    coverImage: "",
    currency: "USD",
    deadline: "",
    taskDescription: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    instance.get(`/AllJobs/${id}`).then((res) => {
      const data = res.data;
      setJob({
        title: data.title || "",
        category: data.category || "",
        budget: data.budget || "",
        status: data.status || "open",
        summary: data.summary || "",
        coverImage: data.coverImage || "",
        currency: data.currency || "USD",
        deadline: data.deadline ? data.deadline.slice(0, 10) : "",
        taskDescription: data.taskDescription || "",
      });
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!job.title.trim()) newErrors.title = "Title is required";
    if (!job.category.trim()) newErrors.category = "Category is required";
    if (!job.budget) newErrors.budget = "Budget is required";
    if (!job.summary.trim()) newErrors.summary = "Summary is required";
    if (!job.taskDescription.trim())
      newErrors.taskDescription = "Task description is required";
    return newErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await instance.put(`/my-added-jobs/${id}/accept`, job);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Job details updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/my-added-jobs");
        fetcAddedhData();
        fetchData();
      } else {
        Swal.fire("No Changes", "Nothing was updated", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }

  const errorClasses = "text-sm text-red-500 mt-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-4 py-6 border border-cyan-400 rounded-xl shadow-4xl"
    >
      <div className="rounded-2xl p-4 md:p-6">
        <h2 className="text-3xl tracking-tight dark:text-cyan-400 text-cyan-700 font-bold mb-6">
          Update Job Details
        </h2>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div>
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Job Title
            </label>
            <input
              name="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.title && <p className={errorClasses}>{errors.title}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Category
            </label>
            <input
              name="category"
              value={job.category}
              onChange={handleChange}
              placeholder="e.g. Web Development"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.category && (
              <p className={errorClasses}>{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Budget
            </label>
            <input
              name="budget"
              type="number"
              value={job.budget}
              onChange={handleChange}
              placeholder="Enter budget amount"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.budget && <p className={errorClasses}>{errors.budget}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Currency
            </label>
            <input
              name="currency"
              value={job.currency}
              onChange={handleChange}
              placeholder="USD, EUR, BDT"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Cover Image URL
            </label>
            <input
              name="coverImage"
              value={job.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Deadline
            </label>
            <input
              name="deadline"
              type="date"
              value={job.deadline}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Job Status
            </label>
            <select
              name="status"
              value={job.status}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:text-white"
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Short Summary
            </label>
            <textarea
              name="summary"
              value={job.summary}
              onChange={handleChange}
              placeholder="Brief overview of the job"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
              rows="3"
            />
            {errors.summary && <p className={errorClasses}>{errors.summary}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium dark:text-cyan-400 text-black">
              Task Description
            </label>
            <textarea
              name="taskDescription"
              value={job.taskDescription}
              onChange={handleChange}
              placeholder="Detailed job requirements"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200 dark:placeholder-gray-400 dark:text-white"
              rows="5"
            />
            {errors.taskDescription && (
              <p className={errorClasses}>{errors.taskDescription}</p>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col md:flex-row justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg border border-slate-400 w-full md:w-auto
              cursor-pointer hover:scale-105 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 w-full md:w-auto
              cursor-pointer hover:scale-105 transition-all"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateJob;
