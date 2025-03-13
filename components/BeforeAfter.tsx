"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, animate } from "framer-motion";

const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState({
    img1: 2,
    img2: 2,
    img3: 2,
    img4: 2,
  });
  const [isInteracted, setIsInteracted] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });
  const containerRefs = {
    img1: useRef(null),
    img2: useRef(null),
    img3: useRef(null),
    img4: useRef(null),
  };
  const isDragging = useRef({ img1: false, img2: false, img3: false, img4: false });

  useEffect(() => {
    Object.keys(sliderPos).forEach((key) => {
      animate(2, 60, {
        type: "tween",
        duration: 1.5,
        repeat: 1,
        repeatType: "reverse",
        onUpdate: (latest) =>
          setSliderPos((prev) => ({ ...prev, [key]: latest })),
      });
    });
  }, []);

  const updateSliderPos = (clientX, key) => {
    if (!containerRefs[key].current) return;
    const rect = containerRefs[key].current.getBoundingClientRect();
    let newPos = ((clientX - rect.left) / rect.width) * 100;
    newPos = Math.max(2, Math.min(100, newPos));
    setSliderPos((prev) => ({ ...prev, [key]: newPos }));
    setIsInteracted((prev) => ({ ...prev, [key]: true }));
  };

  const handleDrag = (e, key) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    if (isDragging.current[key]) updateSliderPos(clientX, key);
  };

  const startDrag = (e, key) => {
    isDragging.current[key] = true;
    setIsInteracted((prev) => ({ ...prev, [key]: true }));
    document.addEventListener("mousemove", (event) => handleDrag(event, key));
    document.addEventListener("mouseup", () => stopDrag(key));
    document.addEventListener("touchmove", (event) => handleDrag(event, key));
    document.addEventListener("touchend", () => stopDrag(key));
  };

  const stopDrag = (key) => {
    isDragging.current[key] = false;
    document.removeEventListener("mousemove", (event) => handleDrag(event, key));
    document.removeEventListener("mouseup", () => stopDrag(key));
    document.removeEventListener("touchmove", (event) => handleDrag(event, key));
    document.removeEventListener("touchend", () => stopDrag(key));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-16 select-none text-white">
      {/* Title Panel */}
      <div className="relative mb-8 bg-gradient-to-r from-blue-800 to-black rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-3xl font-bold">Before & After</h2>
        <p className="text-lg opacity-80">Slide to see the transformation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {Object.keys(sliderPos).map((key, index) => (
          <div
            key={index}
            ref={containerRefs[key]}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-lg border-4 border-gray-300 shadow-lg"
          >
            {/* Before Image */}
            <div className="absolute inset-0">
              <Image
                src={`/before${index + 1}.jpg`}
                alt="Before"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* After Image */}
            <div
              className="absolute inset-0 overflow-hidden transition-opacity duration-500"
              style={{
                width: `${sliderPos[key]}%`,
                filter: isInteracted[key] ? "none" : "blur(10px)",
              }}
            >
              <Image
                src={`/after${index + 1}.png`}
                alt="After"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            {/* Slider Handle */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPos[key]}%` }}
              onMouseDown={(e) => startDrag(e, key)}
              onTouchStart={(e) => startDrag(e, key)}
            >
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white w-6 h-6 rounded-full border border-gray-500 shadow-lg"></div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="mt-16 bg-gray-900 text-white p-6 text-center rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Contact Us</p>
        <p>
          <a href="tel:+91 6380771258" className="text-blue-400 hover:underline">+91 6380771258</a>
        </p>
        <p>
          <a href="mailto:karthik@rflabs.in" className="text-blue-400 hover:underline">karthik@rflabs.in</a>
        </p>
        <p>
          <a
            href="https://wa.me/+916380771258"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline"
          >
            Chat on WhatsApp
          </a>
        </p>
      </footer>
    </div>
  );
};

export default BeforeAfter;
