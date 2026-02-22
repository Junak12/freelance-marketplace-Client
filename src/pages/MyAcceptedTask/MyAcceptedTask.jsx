import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useTask } from "../../hooks/useTask";

const MyAcceptedTask = () => {
  const { tasks, loading, error } = useTask();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <h2 className="text-2xl dark:text-pink-500 font-bold mb-6">
        My Accepted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-red-500 font-semibold">No accepted tasks found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-5 rounded-2xl shadow border border-cyan-400"
            >
              <h3 className="font-semibold text-lg dark:text-cyan-500">
                {task.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-red-500 ">
                {task.category}
              </p>
              <p className="mt-2 dark:text-white">
                {task.currency} {task.budget}
              </p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyAcceptedTask;
