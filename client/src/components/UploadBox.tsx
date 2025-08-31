"use client";

import React, { useRef, useState } from "react";
import { useGetParsedImageMutation } from "@/api/ocrApi";
import { useGetChatGPTResponseMutation } from "@/api/chatgptApi";
import { motion } from "framer-motion";

const UploadBox = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [parseImage, { isLoading: ocrLoading }] = useGetParsedImageMutation();
  const [chatGPTResponse, { isLoading: chatLoading }] =
    useGetChatGPTResponseMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSolution(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSolution(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSolve = async () => {
    if (!selectedImage) return;
    setSolution(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const ocrData = await parseImage(formData).unwrap();
      const extractedText = ocrData?.ParsedResults?.[0]?.ParsedText;

      if (!extractedText) {
        setSolution("No text found in image.");
        return;
      }

      const chatData = await chatGPTResponse({ text: extractedText }).unwrap();
      setSolution(chatData?.content || "No response from ChatGPT.");
    } catch (error) {
      setSolution("Error processing image or AI request.");
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(null);
    setSolution(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="mt-12 w-full max-w-4xl p-6 bg-[var(--foreground)]/10 rounded-2xl shadow-xl text-center cursor-pointer"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {previewUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-xs max-h-64 object-contain rounded-lg"
          />
          <p className="text-black opacity-70">{selectedImage?.name}</p>

          <div className="flex gap-4 mt-4 w-full justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSolve();
              }}
              disabled={ocrLoading || chatLoading}
              className="flex-1 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[#de2160] via-[#8e21de] to-[#3e21de] shadow-lg hover:opacity-50 transition disabled:opacity-50 cursor-pointer"
            >
              {ocrLoading || chatLoading ? "Solving..." : "Solve"}
            </button>
            <button
              onClick={handleRemove}
              className="flex-1 px-4 py-2 rounded-xl text-white bg-red-500 hover:bg-red-400 shadow-lg transition cursor-pointer"
            >
              Remove
            </button>
          </div>

          {solution && (
            <div className="w-full bg-white/80 dark:bg-zinc-900 p-4 rounded-lg mt-4 text-left text-black whitespace-pre-wrap shadow-inner">
              <h4 className="font-semibold mb-1">Response:</h4>
              <p>{solution}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-black opacity-60 text-lg">
          Drag & drop an image here, or click to upload
        </p>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </motion.div>
  );
};

export default UploadBox;
