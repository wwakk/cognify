import React from "react";

type Props = {
  message: string;
  isAI?: boolean;
};

const ChatBox = ({ message, isAI = false }: Props) => {
  return (
    <div
      className={`my-2 p-4 rounded-lg max-w-xl ${
        isAI
          ? "bg-gray-100 ml-auto text-left"
          : "bg-blue-100 mr-auto text-right"
      }`}
    >
      {message}
    </div>
  );
};

export default ChatBox;
