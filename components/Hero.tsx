"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load(); // Reload video if needed
      video.play().catch(() => console.warn("Autoplay prevented by browser"));
      video.playbackRate = 0.5; // Reduce video speed to 0.5x
    }
  }, []);

  const handleGetStarted = () => {
    router.push("/upload"); // Navigate to the upload page
  };

  const text = "Upscale Your Online Presence";
  const text2 = "with KVIK Studios";

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white px-6">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => console.error("Video failed to load:", e)}
      >
        <source src="bg-snake.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Bluish Gradient Overlay for Better Readability */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Typewriter Text Animation */}
        <h1 className="text-5xl sm:text-7xl font-bold mb-4 leading-tight">
          <motion.span
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-800 via-blue-900 to-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05 }}
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}>
                {char}
              </motion.span>
            ))}
          </motion.span>
          <br />
          <motion.span
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-800 via-blue-900 to-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05, delay: text.length * 0.05 }}
          >
            {text2.split("").map((char, index) => (
              <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (text.length + index) * 0.05 }}>
                {char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (text.length + text2.length) * 0.05 }}
        >
          No more hassle—perfect shots, effortlessly.
        </motion.p>

        {/* Get Started Button */}
        <motion.button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (text.length + text2.length) * 0.05 + 0.5 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
}
