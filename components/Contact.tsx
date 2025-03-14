"use client";

import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";

const validEmailDomains = ["gmail.com", "yahoo.com", "outlook.com", "live.com", "hotmail.com"];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Validate email format and domain
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (!emailRegex.test(email)) return false;
    const domain = email.split("@")[1];
    return validEmailDomains.includes(domain);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address (Gmail, Yahoo, Outlook, etc.).");
      setLoading(false);
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.error || "Something went wrong.");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div id="contact" className="relative w-full max-w-5xl mx-auto my-16 select-none text-white">
      <div className="relative bg-gradient-to-r from-blue-800 to-black rounded-lg p-6 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg opacity-80">We'd love to hear from you! Fill out the form below:</p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-6 bg-black/30 p-4 rounded-md shadow-md space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-600"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Success/Error Messages */}
        {successMessage && <p className="mt-4 text-green-400">{successMessage}</p>}
        {errorMessage && <p className="mt-4 text-red-400">{errorMessage}</p>}

        {/* Contact Details */}
        <div className="mt-6 bg-black/30 p-4 rounded-md shadow-md">
          <div className="flex items-center justify-center space-x-4 mb-3">
            <Mail className="text-white" size={20} />
            <p className="text-lg font-semibold">support@kvikstudios.com</p>
          </div>
          {/*<div className="flex items-center justify-center space-x-4">
            <Phone className="text-white" size={20} />
            <p className="text-lg font-semibold">+91 81487 33387</p>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Contact;
