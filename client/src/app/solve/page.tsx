"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import UploadBox from "@/components/UploadBox";
import Header from "@/components/Header";

const Solve = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-85 px-4">
        <p className="text-black text-2xl mb-8 text-center max-w-2xl">
          Upload a picture of any assignment and let AI help you solve it.
        </p>
        <UploadBox />
      </div>
    </Provider>
  );
};

export default Solve;
