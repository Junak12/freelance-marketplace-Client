import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { useAddedTask } from "../../hooks/useAddedTask";
import { useData } from "../../hooks/useData";
import { useTask } from "../../hooks/useTask";


const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const instance = useAxios();

  const { fetcAddedhData } = useAddedTask();
  const { fetchData } = useData();
  const { fetchTask } = useTask();


  const [job, setJob] = useState({
    title: "",
    category: "",
    budget: "",
    currency: "",
    coverImage: "",
    deadline: "",
    status: "open",
    summary: "",
    taskDescription: "",
    acceptedBy: "",
    postedBy: "",
    postedByEmail: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await instance.get(`/my-added-jobs/${id}`);
        setJob({
          ...res.data,
          postedBy: userData?.name || res.data.postedBy,
          postedByEmail: userData?.email || res.data.postedByEmail,
        });
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id, userData]);

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

    if (job.acceptedBy) {
      Swal.fire({
        icon: "warning",
        title: "Cannot Update",
        text: "This job has already been accepted!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const res = await instance.put(`/my-added-jobs/${id}`, job);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Job details updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      fetcAddedhData();
      fetchData();
      fetchTask();
      navigate("/my-added-jobs");
    } else {
      Swal.fire("No Changes", "Nothing was updated", "info");
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
        <h2 className="text-3xl tracking-tight dark:text-cyan-400 text-cyan-700 font-bold mb-2">
          Update Job Details
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Posted by {job.postedBy} ({job.postedByEmail})
        </p>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input
              name="title"
              value={job.title}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
            {errors.title && <p className={errorClasses}>{errors.title}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              name="category"
              value={job.category}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
            {errors.category && (
              <p className={errorClasses}>{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Budget</label>
            <input
              type="number"
              name="budget"
              value={job.budget}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
            {errors.budget && <p className={errorClasses}>{errors.budget}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Currency</label>
            <input
              name="currency"
              value={job.currency}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Cover Image URL</label>
            <input
              name="coverImage"
              value={job.coverImage}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={job.deadline}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Status</label>
            <select
              name="status"
              value={job.status}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Short Summary</label>
            <textarea
              name="summary"
              value={job.summary}
              onChange={handleChange}
              rows="3"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
            {errors.summary && <p className={errorClasses}>{errors.summary}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Task Description</label>
            <textarea
              name="taskDescription"
              value={job.taskDescription}
              onChange={handleChange}
              rows="5"
              className="w-full px-2 py-1 rounded-xl outline outline-1 outline-cyan-200"
            />
            {errors.taskDescription && (
              <p className={errorClasses}>{errors.taskDescription}</p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-cyan-700 text-white rounded-lg"
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
