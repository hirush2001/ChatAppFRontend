/*
import MessageBox from "./MessageInput";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserApp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // This is used for OTP verification
  const [hasName, setHasName] = useState(false);

  const handleSetName = async () => {
    if (!email.trim() || !otp.trim()) {
      toast.error("Please enter both your email and OTP");
      return;
    }

    try {
      // ✅ Call backend to verify OTP
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/verify/verify",
        {
          email: email,
          otp: otp,
        }
      );

      console.log("OTP verify response:", response.data);

      // ✅ Check if backend actually verified OTP
      if (response.data.message?.toLowerCase().includes("verified")) {
        toast.success("OTP verified! Entering chatroom...");
        setHasName(true); // ✅ Only go to chat if OTP is correct
      } else {
        toast.error(response.data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error(err.response?.data?.error || "Failed to verify OTP");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {!hasName ? (
        <div className="flex flex-col items-center gap-5 p-8 rounded-3xl shadow-2xl w-96 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Enter your email & OTP
          </h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
            Welcome, <span className="text-blue-600">{email}</span> 👋
          </h2>

          <div className="w-full max-w-md">
            {/* ✅ Pass OTP dynamically to MessageBox */
          /*}
            <MessageBox username={email} otp={otp} />
          </div>
        </div>
      )}
    </div>
  );
}
*/



import MessageBox from "./MessageInput";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserApp() {
  const [code, setCode] = useState("");
  
  const [hasName, setHasName] = useState(false);
  const [user, setUser] = useState("");

  const handleSetName = async () => {
    if (!code) {
      toast.error("Please enter the code");
      return;
    }

    try {
      // ✅ Call backend to verify OTP
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/verifycode/verifycode",
        {
          code: code
          
        }
      );

      console.log("CODE verify response:", response.data);

      // ✅ Check if backend actually verified OTP
      if (response.data.message?.includes("Code is correct")) {
        toast.success("Code verified! Entering chatroom...");
        setHasName(true); // ✅ Only go to chat if OTP is correct
      } else {
        toast.error(response.data.error || "Invalid Code");
      }
    } catch (err) {
      console.error("Error verifying Code:", err);
      toast.error(err.response?.data?.error || "Failed to verify Code");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      {!hasName ? (
        <div className="flex flex-col items-center gap-5 p-8 rounded-3xl shadow-2xl w-96 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            Enter your Details
          </h2>
  
          {/* ✅ Username input uses user state */}
          <input
            type="text"
            value={user} // <-- use user here
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-red-400 focus:ring-4 focus:ring-yellow-300 outline-none text-gray-800 shadow-md"
          />
  
          {/* ✅ Code input uses code state */}
          <input
            type="text"
            value={code} // <-- keep code state for email/otp
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-red-400 focus:ring-4 focus:ring-yellow-300 outline-none text-gray-800 shadow-md"
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
            Welcome, <span className="text-blue-600">{user}</span> 👋
          </h2>
  
          <div className="w-full max-w-md">
            {/* ✅ Pass username and code correctly */}
            <MessageBox username={user} code={code} />
          </div>
        </div>
      )}
    </div>
  );
}  