"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"; // adjust path if needed
import UploadBox from "@/components/UploadBox";

const Home = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Cognify</h1>
        <p className="text-zinc-200 text-xl mb-8 text-center max-w-xl">
          Upload a picture of any assignment and let AI help you solve it.
        </p>
        <UploadBox />
      </div>
    </Provider>
  );
};

export default Home;
