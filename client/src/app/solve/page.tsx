"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { motion } from "framer-motion";
import UploadBox from "@/components/UploadBox";
import Link from "next/link";
import Header from "@/components/Header";
import DashboardBox from "@/components/DashboardBox";

const SolvePage = () => {
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
            Solve Your Homework Instantly
          </h1>
          <p className="mt-4 text-black opacity-80 text-lg">
            Upload an image of your assignment and get AI-powered solutions
            instantly. Perfect for math, science, and other subjects.
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
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-4xl text-center mb-12 px-6"
        >
          <h2 className="text-2xl text-black font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">1. Upload</h4>
              <p className="text-black text-sm opacity-70">
                Drag & drop or select an image of your problem.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">
                2. AI Processing
              </h4>
              <p className="text-black text-sm opacity-70">
                Our AI extracts the text and analyzes the problem.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <h4 className="text-black font-semibold mb-2">3. Solution</h4>
              <p className="text-black text-sm opacity-70">
                Receive a step-by-step solution instantly.
              </p>
            </div>
          </div>
        </motion.section>

        <DashboardBox />
      </div>
    </Provider>
  );
};

export default SolvePage;
