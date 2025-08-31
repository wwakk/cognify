"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow flex flex-col items-center w-full">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default Landing;
