"use client";

import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
      <footer className="relative bg-gradient-to-r from-blue-800 to-black text-white py-8 px-6 mt-16 shadow-lg">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <FaPhone className="text-lg" /> +91 98765 43210
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <FaEnvelope className="text-lg" /> contact@kvikstudios.com
            </p>
          </div>

          {/* Branding */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-extrabold">KVIK Studios</h2>
            <p className="text-sm opacity-80 mt-1">Perfect shots, effortlessly.</p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end">
            <h2 className="text-xl font-bold mb-2">Chat with Us</h2>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center md:justify-end gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <FaWhatsapp className="text-lg" /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-70 mt-6 border-t border-gray-600 pt-4">
          &copy; {new Date().getFullYear()} KVIK Studios. All Rights Reserved.
        </div>
      </footer>
    );
  };

export default Contact;
