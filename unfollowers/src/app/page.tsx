import Header from "@/components/Header";
import FAQLinks from "@/components/FAQLinks";
import InputBox from "@/components/InputBox";
import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
      <Header />
      <FAQLinks />
      
      {/* Input Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <InputBox label="Followers" color="blue" />
        <InputBox label="Followings" color="blue" />
      </div>
      <Button />

      {/* Help Section at the Bottom */}
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
        <div className="mt-6 text-gray-500 text-sm">
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
