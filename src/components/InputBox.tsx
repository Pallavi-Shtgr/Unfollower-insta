"use client";

import { useState } from "react";

interface InputBoxProps {
  label: string;
  color: "green" | "blue";
}

const InputBox: React.FC<InputBoxProps> = ({ label, color }) => {
  const [charCount, setCharCount] = useState(0);
  const [text, setText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleClear = () => {
    setText("");
    setCharCount(0);
  };

  return (
    <div
      className={`p-4 rounded-lg w-full max-w-md relative ${
        color === "green" ? "bg-green-100" : "bg-blue-100"
      }`}
    >
      <div className="flex justify-between">
        {/* 🔹 Dark blue text for better visibility */}
        <span className="text-lg font-bold text-blue-900">{label}</span>

        <div className="flex items-center space-x-2">
          <span className="text-blue-900 text-sm">{charCount}</span>
          <button
            onClick={handleClear}
            className="text-sm text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700 transition"
          >
            Clear
          </button>
        </div>
      </div>
      <textarea
        placeholder="Paste your JSON code here"
        value={text}
        onChange={handleInputChange}
        className="w-full h-32 bg-white border border-gray-400 rounded p-2 mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-800">Or upload a file</span>
        <input type="file" className="w-auto bg-gray-200 p-2 rounded text-black cursor-pointer hover:bg-gray-300" />
      </div>
    </div>
  );
};

export default InputBox;
