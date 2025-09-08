"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { motion } from "framer-motion";
import UploadBox from "@/components/UploadBox";
import Link from "next/link";
import Header from "@/components/Header";

const PracticePage = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-white px-4 py-12">
        {/* Page Heading / Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mb-8"
        >
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de]">
            Practice Makes Perfect
          </h1>
          <p className="mt-4 text-black opacity-80 text-lg">
            Upload notes or topics and receive practice problems with thought
            out solutions. Review, retry, and build mastery with each attempt.
          </p>
        </motion.div>

        {/* Upload Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-4xl mb-12"
        >
          <UploadBox />
        </motion.div>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-4xl text-center mb-12 px-6"
        >
          <h2 className="text-2xl text-black font-bold mb-6">
            How Our Practice Problems Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">1. Upload</h4>
              <p className="text-black text-sm opacity-70">
                Add your notes or topics you want to practice — math, physics,
                chemistry, and more.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">2. Try It First</h4>
              <p className="text-black text-sm opacity-70">
                Attempt the problem yourself before revealing the solution.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">3. Step-by-Step</h4>
              <p className="text-black text-sm opacity-70">
                Compare your work with the guided solution and learn from your
                mistakes.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Extra Practice Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-4xl text-center mb-12 px-6"
        >
          <h2 className="text-2xl text-black font-bold mb-6">
            Practice Session Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">Track Progress</h4>
              <p className="text-black text-sm opacity-70">
                See which problems you’ve mastered and where you need more
                practice.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">
                Generate New Problems
              </h4>
              <p className="text-black text-sm opacity-70">
                Get fresh, AI-generated practice problems based on your weak
                spots.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full py-16 bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] text-white text-center rounded-2xl max-w-4xl px-6"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Learning?
          </h3>
          <p className="mb-6 opacity-80 text-white text-lg">
            Create a free account to save your practice history, track progress,
            and unlock unlimited practice sets.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl font-medium border-2 border-white bg-white text-black hover:bg-transparent hover:text-white transition"
            >
              Create Account
            </Link>
            <Link
              href="/signin"
              className="px-6 py-3 rounded-xl font-medium border-2 border-white hover:bg-white hover:text-black transition"
            >
              Sign In
            </Link>
          </div>
        </motion.section>
      </div>
    </Provider>
  );
};

export default PracticePage;
