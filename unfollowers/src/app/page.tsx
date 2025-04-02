"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FAQLinks from "@/components/FAQLinks";

export default function Home() {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [unfollowers, setUnfollowers] = useState<string[]>([]);
  const [followersUploaded, setFollowersUploaded] = useState(false);
  const [followingUploaded, setFollowingUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiUrl, setApiUrl] = useState<string | undefined>(process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    console.log("API URL from environment:", apiUrl); // To check if the URL is correctly loaded
  }, [apiUrl]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (type === "followers") {
          setFollowers(data.followers.map((user: { username: string }) => user.username));
          setFollowersUploaded(true);
        } else if (type === "following") {
          setFollowing(data.following.map((user: { username: string }) => user.username));
          setFollowingUploaded(true);
        }
        setErrorMessage(""); // Clear error if files are uploaded successfully
      } catch (error) {
        console.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const generateUnfollowers = () => {
    if (!followersUploaded || !followingUploaded) {
      setErrorMessage("⚠️ No files uploaded. Please upload both JSON files.");
      return;
    }
    const unfollowersList = following.filter((user) => !followers.includes(user));
    setUnfollowers(unfollowersList);
    setErrorMessage(""); // Clear error if the process is successful

    // If you want to make an API call to process unfollowers, you can use the apiUrl here
    // Example (if you had an endpoint to handle unfollower data):
    if (apiUrl) {
      fetch(`${apiUrl}/unfollowers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unfollowers: unfollowersList }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API response:", data);
        })
        .catch((error) => {
          console.error("Error posting unfollowers:", error);
        });
    }
  };

  return (
    <main className="flex flex-col items-center p-8">
      <Header />
      <FAQLinks />

      {/* Upload Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition">
          {followersUploaded ? "Followers Uploaded" : "Upload followers.json"}
          <input type="file" onChange={(e) => handleFileUpload(e, "followers")} accept=".json" className="hidden" />
        </label>
        <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition">
          {followingUploaded ? "Following Uploaded" : "Upload following.json"}
          <input type="file" onChange={(e) => handleFileUpload(e, "following")} accept=".json" className="hidden" />
        </label>
      </div>

      {/* Error Message (If No Files Uploaded) */}
      {errorMessage && (
        <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
      )}

      {/* Generate Unfollowers Button (Green) */}
      <button
        onClick={generateUnfollowers}
        className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 transition"
      >
        Generate Unfollowers
      </button>

      {/* Unfollowers List in Very Light Sky-Blue Box */}
      {unfollowers.length > 0 && (
        <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-lg font-bold text-red-600 text-center">Unfollowers</h2>
          <ul className="list-disc pl-5 mt-3">
            {unfollowers.map((username) => (
              <li key={username} className="text-gray-700 py-1">@{username}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Help Section */}
      <footer className="mt-12 w-full max-w-2xl p-6 bg-gray-100 rounded-lg text-center">
        <h2 className="text-lg font-bold text-gray-900">Help</h2>
        <p className="text-gray-700 mt-2">
          <strong>🔹 Upload Instagram JSON File</strong><br />
          Go to Instagram settings and open 'Your Activity.'<br />
          Select 'Download Your Information' and request a JSON file.<br />
          Once downloaded, upload it here to analyze your data.
        </p>
        <p className="text-gray-700 mt-4">
          <strong>🔹 Download Instagram Data</strong><br />
          Instagram will send you an email with a download link.<br />
          Extract the file and find 'followers.json' or 'following.json.'<br />
          Use this tool to check your data.
        </p>

        {/* Copyright & GitHub Link */}
        <div className="mt-6 text-gray-600 text-sm">
          © 2025 All rights reserved.
          <a
            href="https://github.com/pallavi-shtgr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline ml-1"
          >
            pallavi-shtgr
          </a>
        </div>
      </footer>
    </main>
  );
}
