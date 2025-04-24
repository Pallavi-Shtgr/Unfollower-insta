"use client";

import { useState, useRef } from "react";

const FAQLinks = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  const faqs = {
    "How to use?": "Paste your Instagram JSON file in the input box to see the results instantly.",
    "Why is it safe?": "Your data is processed locally and never stored or shared.",
    "Do I need to pay?": "This tool is completely free for all users.",
  };

  const handleHelpClick = () => {
    setActiveLink("Help");
    helpRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="text-center text-gray-400 py-2 flex flex-col items-center">
      
      <div className="flex gap-4">
        {Object.keys(faqs).map((link) => (
          <button
            key={link}
            onClick={() => setActiveLink(link)}
            className={`transition ${
              activeLink === link ? "text-black font-bold" : "hover:text-black"
            }`}
          >
            {link}
          </button>
        ))}
        <button onClick={handleHelpClick} className="hover:text-black transition">Help</button>
      </div>


      {activeLink && activeLink !== "Help" && (
  <div className="mt-4 p-4 bg-blue-50 text-black rounded-lg max-w-md shadow-lg">
    <p>{faqs[activeLink as keyof typeof faqs]}</p>
  </div>
)}

   
      <div ref={helpRef}></div>
    </div>
  );
};

export default FAQLinks;
