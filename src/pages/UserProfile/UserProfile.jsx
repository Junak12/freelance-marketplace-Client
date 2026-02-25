import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import { useTask } from "../../hooks/useTask";
import { useAddedTask } from "../../hooks/useAddedTask";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUser } from "../../hooks/useUser";


const UserProfile = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const { tasks } = useTask();
  const { addedTasks } = useAddedTask();
  const { userData, fetchUser, loading } = useUser();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", image: "" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (userData) {
      setForm({ name: userData.name || "", image: userData.image || "" });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatePayload = {};
      if (form.name.trim()) updatePayload.name = form.name;
      if (form.image.trim()) updatePayload.image = form.image;

      if (Object.keys(updatePayload).length === 0) {
        Swal.fire("Error", "No fields to update", "warning");
        return;
      }

      await instance.put(`/update-profile/${user.email}`, updatePayload);
      await fetchUser();
      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const totalAdded = addedTasks.length;
  const totalAccepted = tasks.length;
  const completedCount = tasks.filter(
    (t) => t.status?.toLowerCase() === "completed",
  ).length;
  const completionRate =
    totalAccepted === 0
      ? 0
      : Math.round((completedCount / totalAccepted) * 100);
  const statusData = [
    { name: "Open", value: tasks.filter((t) => t.status === "open").length },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in progress").length,
    },
    { name: "Completed", value: completedCount },
  ];

  if (loading || !userData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-6"
    >
      <div className="flex flex-col md:flex-row gap-6 border-b pb-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src={
              editMode
                ? form.image || userData.image
                : `${userData.image}?t=${Date.now()}`
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2"
          />
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-cyan-700 text-white rounded-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setForm({ name: userData.name, image: userData.image });
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 border rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="flex-1">
          {editMode ? (
            <div className="space-y-3 max-w-md">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Full name"
              />
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Profile image URL"
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold">{userData.name}</h2>
              <p className="text-gray-500">{userData.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
        <div className="border border-cyan-400 rounded-xl p-6 shadow-sm">
          <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Total Added Tasks
          </p>
          <p className="text-2xl md:text-4xl font-black text-cyan-700 mt-2">
            {totalAdded}
          </p>
        </div>
        <div className="border border-cyan-400 rounded-xl p-6 shadow-sm">
          <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
            Accepted Tasks
          </p>
          <p className="text-2xl md:text-4xl font-black text-cyan-700 mt-2">
            {totalAccepted}
          </p>
        </div>
        <div className="border border-cyan-400 rounded-xl p-6 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Completion Rate
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-end gap-2">
              <span className="text-2xl md:text-4xl font-black text-cyan-700">
                {completionRate}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="h-full bg-cyan-600"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-cyan-400 rounded-xl p-4 md:p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-6 border-l-4 border-cyan-600 pl-3">
          Task Status Breakdown
        </h3>
        <div className="w-full h-[250px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={statusData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(14, 116, 144, 0.1)" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="value"
                fill="#0e7490"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
