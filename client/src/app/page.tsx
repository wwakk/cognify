"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"; // adjust path if needed
import UploadBox from "@/components/UploadBox";
import Header from "@/components/Header";

const Home = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="min-h-screen bg-zinc-800 flex flex-col items-center justify-start pt-85 px-4">
        <p className="text-zinc-200 text-2xl mb-8 text-center max-w-2xl">
          Upload a picture of any assignment and let AI help you solve it.
        </p>
        <UploadBox />
      </div>
    </Provider>
  );
};

export default Home;
