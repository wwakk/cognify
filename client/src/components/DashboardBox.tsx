"use client";

import { useGetAuthUserQuery } from "@/api/authApi";
import { useGetUserUploadsQuery } from "@/api/uploadsApi"; // import your query
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const MotionLink = motion(Link);

const DashboardBox = () => {
  const { data: user, error, isLoading } = useGetAuthUserQuery();

  // Only fetch uploads if we have a user
  const {
    data: uploads,
    isLoading: uploadsLoading,
    error: uploadsError,
  } = useGetUserUploadsQuery(
    { userId: user?.userId as string },
    { skip: !user } // skip until logged in
  );

  return (
    <div className="w-full flex flex-col items-center">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-10 w-full max-w-4xl py-16 shadow-2xl text-white text-center rounded-2xl mx-2
          bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de]"
      >
        {isLoading ? (
          <p className="text-lg">Loading user...</p>
        ) : error || !user ? (
          // -------------------
          // Not signed in
          // -------------------
          <>
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
          </>
        ) : (
          // -------------------
          // Signed in
          // -------------------
          <>
            <h3 className="text-3xl font-bold mb-8">
              Your Recent Work, {user.username} ✨
            </h3>

            {uploadsLoading ? (
              <p className="opacity-80">Loading your uploads...</p>
            ) : uploadsError ? (
              <p className="opacity-80">Failed to load uploads.</p>
            ) : uploads && uploads.length > 0 ? (
              <ul className="space-y-4 text-left mx-auto max-w-xl">
                {uploads.slice(0, 5).map((upload) => (
                  <li
                    key={upload.id}
                    className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition"
                  >
                    <p className="font-semibold">
                      {upload.file_name.split("/").pop() ||
                        "Untitled File Name"}
                    </p>
                    <p className="font-semibold">
                      {upload.file_url.split("/").pop() || "Untitled Upload"}
                    </p>
                    <p className="text-sm opacity-80">
                      Uploaded on{" "}
                      {new Date(upload.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm mt-1 opacity-70 line-clamp-2">
                      {upload.ai_response}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="opacity-80">
                No uploads yet. Try solving or practicing!
              </p>
            )}

            <div className="flex justify-center mt-8">
              <MotionLink
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-xl font-medium border-2 border-white bg-white text-black hover:bg-transparent hover:text-white transition"
              >
                View Full Dashboard
              </MotionLink>
            </div>
          </>
        )}
      </motion.section>
    </div>
  );
};

export default DashboardBox;
