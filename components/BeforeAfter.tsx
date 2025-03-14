"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, animate } from "framer-motion";

const BeforeAfter: React.FC = () => {
  type ImageKeys = "img1" | "img2" | "img3" | "img4";

  const [sliderPos, setSliderPos] = useState<Record<ImageKeys, number>>({
    img1: 2,
    img2: 2,
    img3: 2,
    img4: 2,
  });

  const [isInteracted, setIsInteracted] = useState<Record<ImageKeys, boolean>>({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  const containerRefs: Record<ImageKeys, React.RefObject<HTMLDivElement>> = {
    img1: useRef<HTMLDivElement>(null as unknown as HTMLDivElement),
    img2: useRef<HTMLDivElement>(null as unknown as HTMLDivElement),
    img3: useRef<HTMLDivElement>(null as unknown as HTMLDivElement),
    img4: useRef<HTMLDivElement>(null as unknown as HTMLDivElement),
  };

  const isDragging = useRef<Record<ImageKeys, boolean>>({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });

  useEffect(() => {
    (Object.keys(sliderPos) as ImageKeys[]).forEach((key) => {
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

  const updateSliderPos = (clientX: number, key: ImageKeys) => {
    const container = containerRefs[key].current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let newPos = ((clientX - rect.left) / rect.width) * 100;
    newPos = Math.max(2, Math.min(100, newPos));

    setSliderPos((prev) => ({ ...prev, [key]: newPos }));
    setIsInteracted((prev) => ({ ...prev, [key]: true }));
  };

  const handleDrag = (e: MouseEvent | TouchEvent, key: ImageKeys) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    if (isDragging.current[key]) updateSliderPos(clientX, key);
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent, key: ImageKeys) => {
    isDragging.current[key] = true;
    setIsInteracted((prev) => ({ ...prev, [key]: true }));

    const handleMouseMove = (event: MouseEvent) => handleDrag(event, key);
    const handleTouchMove = (event: TouchEvent) => handleDrag(event, key);
    const stopDragHandler = () => stopDrag(key);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDragHandler);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", stopDragHandler);
  };

  const stopDrag = (key: ImageKeys) => {
    isDragging.current[key] = false;
  };

  return (
    <div  id="before-after" className="relative w-full max-w-5xl mx-auto my-16 select-none text-white">
      <div className="relative mb-8 bg-gradient-to-r from-blue-800 to-black rounded-lg p-6 text-center shadow-lg">
        <h2 className="text-3xl font-bold">Before & After</h2>
        <p className="text-lg opacity-80">Slide to see the transformation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {(Object.keys(sliderPos) as ImageKeys[]).map((key, index) => (
          <div
            key={index}
            ref={containerRefs[key]}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-lg border-4 border-gray-300 shadow-lg"
          >
            <div className="absolute inset-0">
              <Image
                src={`/before${index + 1}.jpg`}
                alt="Before"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

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
    </div>
  );
};

export default BeforeAfter;
