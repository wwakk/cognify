"use client";

import React, { useRef, useState } from "react";
import { useGetParsedImageMutation } from "@/api/ocrApi";
import { useGetChatGPTResponseMutation } from "@/api/chatgptApi";

const UploadBox = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [parseImage, { isLoading }] = useGetParsedImageMutation();
  const [chatGPTResponse] = useGetChatGPTResponseMutation();

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
      // 1️⃣ Create FormData correctly
      const formData = new FormData();
      formData.append("image", selectedImage);

      // 2️⃣ Call OCR API
      const ocrData = await parseImage(formData).unwrap();
      const extractedText = ocrData?.ParsedResults?.[0]?.ParsedText;
      if (!extractedText) {
        setSolution("No text found in image.");
        return;
      }

      // 3️⃣ Call ChatGPT API
      const chatData = await chatGPTResponse({
        text: extractedText,
      }).unwrap();
      setSolution(chatData?.content || "No response from ChatGPT.");
    } catch (error) {
      console.error("Error:", error);
      setSolution("Error processing image or AI request.");
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(null);
    setSolution(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className="border-2 border-dashed border-zinc-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-400 transition w-full max-w-2xl"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {previewUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-xs max-h-64 object-contain rounded"
          />
          <p className="text-sm text-zinc-500">{selectedImage?.name}</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSolve();
              }}
              disabled={isLoading}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Solving..." : "Solve"}
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
        <p className="text-zinc-500">
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
    </div>
  );
};

export default UploadBox;
