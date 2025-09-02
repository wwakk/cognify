"use client";

import { motion } from "framer-motion";
import { FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// Framer Motion + Next Link combo
const MotionLink = motion(Link);

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<"homework" | "practice">(
    "homework"
  );

  return (
    <div className="flex flex-col items-center">
      {/* Heading + Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 text-center max-w-3xl"
      >
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de]">
          AI-Powered Learning Made Simple
        </h2>
        <p className="mt-4 text-black text-lg opacity-80">
          An intelligent study companion built to accelerate learning. Solve
          assignments in seconds and strengthen your understanding with
          customized practice problems — all in one place.
        </p>

        {/* CTA Button */}
        <MotionLink
          href="/solve"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-block px-6 py-3 rounded-xl font-medium text-white shadow-xl bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] cursor-pointer"
        >
          Get Started →
        </MotionLink>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-6"
      >
        {/* Homework Solver */}
        <MotionLink
          href="/solve"
          whileHover={{ scale: 1.05 }}
          className="block p-6 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-[#de2160]/50 transition cursor-pointer"
        >
          <FileText className="w-10 h-10 text-[#de2160]" />
          <h3 className="mt-4 text-xl text-black font-semibold">
            Homework Solver
          </h3>
          <p className="mt-2 text-sm text-black opacity-70">
            Upload assignments and get AI-powered solutions.
          </p>
        </MotionLink>

        {/* Practice Problems */}
        <MotionLink
          href="/practice"
          whileHover={{ scale: 1.05 }}
          className="block p-6 bg-white rounded-2xl shadow-xl border-2 border-transparent hover:border-[#3e21de]/50 transition cursor-pointer"
        >
          <BookOpen className="w-10 h-10 text-[#3e21de]" />
          <h3 className="mt-4 text-xl text-black font-semibold">
            Practice Problems
          </h3>
          <p className="mt-2 text-sm text-black opacity-70">
            Generate custom practice sets with step-by-step answers.
          </p>
        </MotionLink>
      </motion.div>

      {/* Signup Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-20 w-full py-16 shadow-2xl bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] text-white text-center rounded-2xl mx-2"
      >
        <h3 className="text-3xl font-bold mb-4">Sign Up or Sign In</h3>
        <p className="mb-6 opacity-80">
          Get personalized AI solutions and track your learning progress.
        </p>
        <div className="flex justify-center gap-4">
          <MotionLink
            href="/signup"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-xl font-medium border-2 border-white bg-white text-black hover:bg-transparent hover:text-white transition"
          >
            Sign Up
          </MotionLink>
          <MotionLink
            href="/signin"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-xl font-medium border-2 border-white hover:bg-white hover:text-black transition"
          >
            Sign In
          </MotionLink>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
