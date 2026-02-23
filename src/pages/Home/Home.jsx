import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import JobCards from "../../components/CardSix/JobCards"; 
import ReviewForm from "../../components/Reviews/ReviewForm";
import TopReviews from "../../components/Reviews/TopReviews";
import { useData } from "../../hooks/useData";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { data, loading } = useData();
  const jobs = data.slice(0,6);
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading jobs...</p>;

  if (!data?.length)
    return <p className="text-center py-20 text-red-500">No jobs found</p>;

  return (
    <div>
      <Hero />

      <div className="mt-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
          Hire Experts. Deliver Exceptional Results.
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-24">
          {jobs.map((job) => (
            <div key={job._id}>
              <JobCards item={job} />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-6 lg:mt-6">
          <button
            className="text-xl border px-6 py-2 rounded-2xl bg-cyan-700 text-white font-semibold
          cursor-pointer hover:scale-110 transition-all"
            onClick={() => navigate("/AllJob")}
          >
            View More
          </button>
        </div>
      </div>
      <div className="mx-auto mt-15">
        <ReviewForm />
      </div>
      <div className="mt-10 mb-10">
        <TopReviews />
      </div>
    </div>
  );
};

export default Home;
