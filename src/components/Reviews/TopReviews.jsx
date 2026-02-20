import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

const TopReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const instance = useAxios();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await instance.get("/getTopReviews");
        const sorted = res.data.sort((a, b) => b.rating - a.rating);
        setReviews(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 font-bold text-gray-700 dark:text-gray-200">
        Loading Reviews...
      </p>
    );
  }

  if (!reviews.length) {
    return (
      <p className="text-center py-10 font-bold text-gray-700 dark:text-gray-200">
        No Reviews Yet
      </p>
    );
  }

  const reviewsToShow =
    reviews.length > 3 && !showAll ? reviews.slice(0, 3) : reviews;

  return (
    <section className="px-6 sm:px-10 lg:px-24 py-16  rounded-3xl">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
        Top Reviews
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviewsToShow.map((review) => (
          <div
            key={review._id}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={20}
                    className={
                      i < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-200">{review.text}</p>
            </div>
            <p className="mt-4 font-bold text-gray-900 dark:text-white">
              — {review.name}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show All Reviews"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TopReviews;
