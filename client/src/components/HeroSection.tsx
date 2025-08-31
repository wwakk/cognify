"use client";

import { motion } from "framer-motion";
import { FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<"homework" | "practice">(
    "homework"
  );

  return (
    <div className="flex flex-col items-center">
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8"
        >
          <Link
            href="/solve"
            className="px-6 py-3 rounded-xl font-medium text-white shadow-xl bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de]"
          >
            Get Started →
          </Link>
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl px-6"
      >
        {/* Homework Solver */}
        <Link href="/solve">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-[var(--foreground)]/10 rounded-2xl shadow-xl border-2 border-transparent hover:border-[#de2160]/50 transition"
          >
            <FileText className="w-10 h-10 text-[#de2160]" />
            <h3 className="mt-4 text-xl text-black font-semibold">
              Homework Solver
            </h3>
            <p className="mt-2 text-sm text-black opacity-70">
              Upload assignments and get AI-powered solutions.
            </p>
          </motion.div>
        </Link>

        {/* Practice Problems */}
        <Link href="/practice">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-[var(--foreground)]/10 rounded-2xl shadow-xl border-2 border-transparent hover:border-[#3e21de]/50 transition"
          >
            <BookOpen className="w-10 h-10 text-[#3e21de]" />
            <h3 className="mt-4 text-xl text-black font-semibold">
              Practice Problems
            </h3>
            <p className="mt-2 text-sm text-black opacity-70">
              Generate custom practice sets with step-by-step answers.
            </p>
          </motion.div>
        </Link>
      </motion.div>

      <section className="mt-20 w-full py-16 bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] text-white text-center rounded-2xl mx-2">
        <h3 className="text-3xl font-bold mb-4">Sign Up or Sign In</h3>
        <p className="mb-6 opacity-80">
          Get personalized AI solutions and track your learning progress.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-xl font-medium border-2 border-white bg-white text-black hover:bg-transparent hover:text-white"
          >
            Sign Up
          </Link>
          <Link
            href="/signin"
            className="px-6 py-3 rounded-xl font-medium border-2 border-white hover:bg-white hover:text-black"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Example Tabs Section
      <div className="mt-20 w-full max-w-4xl px-6">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("homework")}
            className={`px-4 py-2 rounded-xl shadow-xl font-medium ${
              activeTab === "homework"
                ? "bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Homework Solver Example
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`px-4 py-2 rounded-xl shadow-xl font-medium ${
              activeTab === "practice"
                ? "bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Practice Problems Example
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className=" p-12 bg-[var(--foreground)]/10 rounded-2xl shadow-xl text-black"
        >
          {activeTab === "homework" ? (
            <div>
              <h4 className="font-semibold text-lg mb-2">Homework Example</h4>
              <p className="opacity-70">
                Upload a math or science problem and see step-by-step AI
                solutions instantly.
              </p>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold text-lg mb-2">
                Practice Problems Example
              </h4>
              <p className="opacity-70">
                Generate a set of practice questions with hints and detailed
                explanations for better learning.
              </p>
            </div>
          )}
        </motion.div>
      </div> */}
    </div>
  );
};

export default HeroSection;
