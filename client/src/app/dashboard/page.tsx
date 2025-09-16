"use client";

import { useGetAuthUserQuery } from "@/api/authApi";
import { useGetUserUploadsQuery } from "@/api/uploadsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "../store";
import Header from "@/components/Header";

const DashboardPage = () => {
  const { data: user, isLoading: authLoading } = useGetAuthUserQuery();

  // only fetch uploads if user is signed in
  const {
    data: uploads,
    isLoading: uploadsLoading,
    error: uploadsError,
  } = useGetUserUploadsQuery(user ? { userId: user.userId } : skipToken);

  if (authLoading) {
    return <p className="text-center mt-10">Loading user...</p>;
  }

  if (!user) {
    return (
      <Provider store={store}>
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">
            Please sign in to view your dashboard
          </h2>
        </div>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Header />
      <div className="max-w-5xl mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold mb-6">📊 Your Dashboard</h1>

        {uploadsLoading ? (
          <p>Loading your uploads...</p>
        ) : uploadsError ? (
          <p className="text-red-500">Error loading uploads</p>
        ) : uploads && uploads.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploads.map((upload) => (
              <motion.div
                key={upload.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-4"
              >
                <img
                  src={upload.file_url}
                  alt={upload.file_name}
                  className="rounded-md max-h-48 object-contain w-full"
                />
                <p className="mt-2 font-semibold">{upload.file_name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(upload.created_at).toLocaleString()}
                </p>
                <div className="mt-3 bg-gray-100 rounded-md p-2 text-sm text-black whitespace-pre-wrap max-h-32 overflow-y-auto">
                  {upload.ai_response}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No uploads yet. Try solving a problem!
          </p>
        )}
      </div>
    </Provider>
  );
};

export default DashboardPage;
