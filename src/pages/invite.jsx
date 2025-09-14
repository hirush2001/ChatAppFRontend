import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function InviteChat() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
    const navigate = useNavigate();

    async function handleinvite() {
        try {
            const response = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "/verify/verify",
              { 
                    email : email,
                    otp: otp
                }

            
            );
            console.log("Sunccefully Enter ChatRomm", response.data);
            toast.success("You are Entered ChatRoom");
            navigate("/username",{ state : {otp}});
        } catch (e) {
            if (e.response) {
                console.log("Cannot Enter ChatRoom:", e.response.data);
                toast.error("Cannot Enter ChatRoom");
              } else {
                console.log("Entering error:", e);
                toast.error("Entering error");
              }
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Enter Chat Room Code
            </h1>
      
          {/* Input */}
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter Code"
              className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
      
            {/* Button */}
            <button
              onClick={handleinvite}
              className="w-full mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200"
            >
              Join Chat Room
            </button>
          </div>
        </div>
      );
      
      
}