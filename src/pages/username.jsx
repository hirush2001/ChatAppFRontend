import MessageBox from "./MessageInput";
import { useState } from "react";

export default function UserApp() {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(""); // ✅ Still keep OTP state, but don't hardcode it
  const [hasName, setHasName] = useState(false);

  const handleSetName = () => {
    if (username.trim()) {
      setHasName(true);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!hasName ? (
        <div className="flex flex-col items-center gap-5 p-8 rounded-3xl shadow-2xl w-96 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">Enter your name</h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-red-400 focus:ring-4 focus:ring-yellow-300 outline-none text-gray-800 shadow-md"
          />

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-red-400 focus:ring-4 focus:ring-green-300 outline-none text-gray-800 shadow-md"
          />

          <button
            onClick={handleSetName}
            className="w-full py-3 rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
          >
            🚀 Join Chat
          </button>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome, <span className="text-blue-600">{username}</span> 👋
          </h2>

          <div className="w-full max-w-md">
            {/* ✅ Pass entered OTP dynamically */}
            <MessageBox username={username} otp={otp} />
          </div>
        </div>
      )}
    </div>
  );
}
