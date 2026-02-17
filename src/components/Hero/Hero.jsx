import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import HeroImgLight from "../../assets/banner7.png";
import HeroImgDark from "../../assets/banner8.png";

const phrases = [
  "Build Projects with World-Class Freelancers.",
  "Turn Ideas into Scalable Digital Products.",
  "Hire Experts. Deliver Faster. Grow Smarter.",
  "Where Talent Meets Opportunity Globally.",
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 1800;

const Hero = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light",
  );

  const [heroImage, setHeroImage] = useState(
    localStorage.getItem("heroImage") || "light",
  );

  /* ----------------------------------
     Preload images (runs once)
  -----------------------------------*/
  useEffect(() => {
    const preload = (src) => {
      const img = new Image();
      img.src = src;
    };

    preload(HeroImgLight);
    preload(HeroImgDark);
  }, []);

  /* ----------------------------------
     Observe theme changes
  -----------------------------------*/
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";

      setTheme(currentTheme);

      const imageType = currentTheme === "dark" ? "dark" : "light";
      setHeroImage(imageType);
      localStorage.setItem("heroImage", imageType);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  /* ----------------------------------
     Typing animation
  -----------------------------------*/
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting && text.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length + 1));
      }, TYPING_SPEED);
    } else if (!isDeleting && text.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(currentPhrase.slice(0, text.length - 1));
      }, DELETING_SPEED);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section className="min-h-screen flex items-center px-6 lg:px-24 md:-mt-20 lg:-mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full gap-12">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            <span className="text-cyan-700 dark:text-cyan-400">{text}</span>
            <span className="ml-2 animate-pulse">|</span>
          </h1>

          <p className="mt-8 text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            A powerful freelance marketplace connecting ambitious businesses
            with verified professionals worldwide. Post projects, collaborate
            efficiently, and deliver exceptional results with confidence.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/create-job"
              className="px-8 py-4 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Create a Job
            </Link>

            <Link
              to="/explore"
              className="px-8 py-4 border border-cyan-700 text-cyan-700 dark:text-cyan-400 dark:border-cyan-400 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={heroImage === "dark" ? HeroImgDark : HeroImgLight}
            alt="Freelance Marketplace"
            className="w-full max-w-3xl h-auto rounded-4xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
