import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

const containerFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Hero = () => {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [heroImage, setHeroImage] = useState(
    localStorage.getItem("heroImage") || "light",
  );

 
  useEffect(() => {
    [HeroImgLight, HeroImgDark].forEach((src) => (new Image().src = src));
  }, []);


  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme =
        document.documentElement.getAttribute("data-theme") || "light";
      const imageType = theme === "dark" ? "dark" : "light";
      setHeroImage(imageType);
      localStorage.setItem("heroImage", imageType);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting && text.length < currentPhrase.length) {
      timer = setTimeout(
        () => setText(currentPhrase.slice(0, text.length + 1)),
        TYPING_SPEED,
      );
    } else if (!isDeleting && text.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(
        () => setText(currentPhrase.slice(0, text.length - 1)),
        DELETING_SPEED,
      );
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);


  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start("show"); 
    } else {
      controls.start("hidden"); 
      setText(""); 
      setPhraseIndex(0);
      setIsDeleting(false);
    }
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="
        relative min-h-screen overflow-hidden
        px-6 lg:px-24
        pt-28 sm:pt-32 md:pt-36 lg:pt-0
        flex items-center
      "
    >
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="w-[700px] h-[700px] rounded-full" />
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 w-full"
        variants={containerFade}
        initial="hidden"
        animate={controls}
      >
        <div>
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
          >
            <span className="text-cyan-700 dark:text-cyan-400">{text}</span>
            <span className="ml-2 animate-pulse">|</span>
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="mt-8 text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed"
          >
            A premium freelance marketplace connecting ambitious businesses with
            verified professionals worldwide. Build faster, scale smarter, and
            ship with confidence.
          </motion.p>

          <motion.div
            variants={itemFadeUp}
            className="mt-10 flex flex-wrap gap-5"
          >
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
          </motion.div>
        </div>

        <motion.div
          variants={itemFadeUp}
          className="flex justify-center lg:justify-end"
        >
          <motion.img
            src={heroImage === "dark" ? HeroImgDark : HeroImgLight}
            alt="Freelance Marketplace"
            className="w-full max-w-3xl h-auto rounded-3xl shadow-2xl dark:shadow-cyan-500/10"
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
