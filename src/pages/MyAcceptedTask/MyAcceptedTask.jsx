import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTask } from "../../hooks/useTask";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const MyAcceptedTask = () => {
  const { tasks, loading, error, fetchTask } = useTask();
  const {user} = useAuth();
  const instance = useAxios();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const handleDelete = async (id) => {
    if (!user?.email) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await instance.delete(`/my-task/${id}`);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
        fetchTask();
      } catch (error) {
        Swal.fire("Error", "Failed to delete the task.", "error");
      }
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      <h2 className="text-3xl tracking-tight dark:text-cyan-400 text-cyan-700 font-bold mb-6">
        My Accepted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-red-500 font-semibold">No accepted tasks found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-5 rounded-2xl shadow border border-cyan-400 dark:border-cyan-500"
            >
              <h3 className="font-semibold text-lg dark:text-cyan-500">
                {task.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-red-500">
                {task.category}
              </p>

              {/* NEW FIELDS */}
              <p className="text-sm mt-1 dark:text-gray-200">
                <span className="font-semibold">Deadline:</span>{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </p>
              <p className="text-sm mt-1 dark:text-gray-200">
                <span className="font-semibold">Posted By:</span>{" "}
                {task.clientEmail || "—"}
              </p>

              <p className="mt-2 dark:text-white">
                {task.currency} {task.budget}
              </p>

              <span className="inline-block mt-3 px-3  rounded-full bg-green-100 text-green-700 text-sm dark:bg-green-800 dark:text-green-200">
                {task.status}
              </span>
              <button
                className="border px-4 py-1 rounded-2xl bg-red-500 border-slate-700 text-white font-medium 
                hover:scale-105 transition-all cursor-pointer"
                onClick={() => handleDelete(task._id)}
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyAcceptedTask;
