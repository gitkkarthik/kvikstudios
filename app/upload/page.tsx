"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function Upload() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      setTimeout(() => {
        setImage(URL.createObjectURL(file));
        setFileName(file.name);
        setLoading(false);
        toast.success("File uploaded successfully!");
      }, 2000);
    } else {
      setFileName("No file chosen");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 overflow-hidden">
      {/* Animated Floating Bubbles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500 opacity-20"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 20, 0],
            x: [0, 20, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <h1 className="text-3xl font-bold mb-4 relative z-10">Upload Your Image</h1>

      {/* Upload Button */}
      <label
        className={`cursor-pointer px-6 py-3 rounded-lg text-lg font-semibold transition inline-block mb-2 relative z-10 
          ${image ? "bg-green-500 hover:bg-green-600" : "bg-gray-700 hover:bg-gray-800"}`}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            Uploading...
          </span>
        ) : image ? "Change File" : "Choose File"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={loading}
        />
      </label>

      {/* File Name Display */}
      <p className="text-gray-300 italic mb-4 relative z-10">{fileName}</p>

      {/* Image Preview with a Professional Look */}
      {image && !loading && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg max-w-md relative z-10">
          <img src={image} alt="Uploaded preview" className="rounded-lg w-full" />
        </div>
      )}
    </div>
  );
}
