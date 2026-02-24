import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";


const ReviewForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const instance = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to submit a review.",
        confirmButtonColor: "#06b6d4",
      });
      return;
    }

    if (!name || !text || rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all fields and select a rating!",
        confirmButtonColor: "#06b6d4",
      });
      return;
    }

    setLoading(true);
    try {
      await instance.post("/reviews", { name, text, rating });
      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
        confirmButtonColor: "#06b6d4",
      });
      setName("");
      setText("");
      setRating(0);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-12 rounded-3xl">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
        Submit Your Review
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto flex flex-col gap-6"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!user}
          className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          disabled={!user}
          className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="flex items-center gap-2 justify-center mt-2">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            const isActive = starValue <= (hover || rating);

            return (
              <button
                key={i}
                type="button"
                onClick={() => user && setRating(starValue)}
                onMouseEnter={() => user && setHover(starValue)}
                onMouseLeave={() => user && setHover(0)}
                disabled={!user}
                className="focus:outline-none transform transition-all duration-200"
              >
                <FaStar
                  size={35}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-yellow-400 drop-shadow-lg"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={loading || !user}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;
