"use client";

import React, { useRef, useState } from "react";
import { useGetParsedImageMutation } from "@/api/ocrApi";
import { useGetChatGPTResponseMutation } from "@/api/chatgptApi";

// ----------------------
// UploadBox Component
// ----------------------
// Handles image uploads, drag & drop, and sending the image to OCR + ChatGPT APIs
const UploadBox = () => {
  // ----------------------
  // State Variables
  // ----------------------
  // Keep track of the selected image, preview URL, and AI solution
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);

  // Ref to the hidden file input for click-to-upload
  const inputRef = useRef<HTMLInputElement>(null);

  // ----------------------
  // API Mutations
  // ----------------------
  // Functions to call the OCR and ChatGPT APIs
  const [parseImage, { isLoading: ocrLoading }] = useGetParsedImageMutation();
  const [chatGPTResponse, { isLoading: chatLoading }] =
    useGetChatGPTResponseMutation();

  // ----------------------
  // Event Handlers
  // ----------------------
  // Handle selecting a file via file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSolution(null); // Clear previous solution
    }
  };

  // Handle dragging and dropping a file
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

  // Allow dragging files over the box
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Trigger click on hidden file input
  const handleClick = () => {
    inputRef.current?.click();
  };

  // ----------------------
  // Solve Button Logic
  // ----------------------
  // Send the image to OCR, then the text to ChatGPT, and display the result
  const handleSolve = async () => {
    if (!selectedImage) return;

    setSolution(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Call OCR API
      const ocrData = await parseImage(formData).unwrap();
      const extractedText = ocrData?.ParsedResults?.[0]?.ParsedText;

      if (!extractedText) {
        setSolution("No text found in image.");
        return;
      }

      // Call ChatGPT API with the extracted text
      const chatData = await chatGPTResponse({ text: extractedText }).unwrap();
      setSolution(chatData?.content || "No response from ChatGPT.");
    } catch (error) {
      console.error("Error:", error);
      setSolution("Error processing image or AI request.");
    }
  };

  // ----------------------
  // Remove Button Logic
  // ----------------------
  // Clear the selected image, preview, and solution
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(null);
    setSolution(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // ----------------------
  // Component Render
  // ----------------------
  return (
    <div
      className="relative p-[2px] rounded-lg w-full max-w-2xl cursor-pointer"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-lg animate-gradient-wave"></div>

      {/* Inner content box (actual upload area) */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-lg p-6 text-center hover:opacity-95 transition">
        {previewUrl ? (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-xs max-h-64 object-contain rounded"
            />
            <p className="text-sm text-zinc-500">{selectedImage?.name}</p>

            {/* Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSolve();
                }}
                disabled={ocrLoading || chatLoading}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition disabled:opacity-50 cursor-pointer"
              >
                {ocrLoading || chatLoading ? "Solving..." : "Solve"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(e);
                }}
                className="flex-1 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded transition cursor-pointer"
              >
                Remove Image
              </button>
            </div>

            {/* Display Solution */}
            {solution && (
              <div className="w-full bg-zinc-600 p-4 rounded text-left mt-4 whitespace-pre-wrap">
                <h3 className="text-md text-white font-semibold mb-1">
                  Response:
                </h3>
                <p className="text-white">{solution}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-zinc-500 text-xl">
            Drag & drop an image here, or click to upload
          </p>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default UploadBox;
