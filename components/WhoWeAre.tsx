"use client";

import React from "react";

const WhoWeAre = () => {
  return (
    <div
      id="who-we-are"
      className="relative w-full max-w-5xl mx-auto my-16 select-none text-white"
    >
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/maple-leaf.jpg')" }}
      ></div>

      <div className="relative mb-8 bg-gradient-to-r from-blue-800 to-black rounded-lg p-6 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Who We Are</h1>
        <p className="text-lg opacity-80">
          Welcome to our platform! We are dedicated to building innovative
          digital solutions that enhance efficiency and simplify everyday tasks.
          With a strong focus on user experience and reliability, we develop
          tools designed to meet the evolving needs of our users.
        </p>
        <div className="mt-6 bg-black/30 p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-2">
            Our mission is to create seamless digital solutions that enhance
            productivity, save time, and provide a smooth user experience. We
            are committed to developing tools that simplify complex tasks and
            bring efficiency to everyday workflows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
