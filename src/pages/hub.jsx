import React from "react";
import { useNavigate } from "react-router-dom";


export default function ChatRoomPage() {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      {/* Main Container */}
      <div className="bg-yellow-200 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to Chat Hub 💬
        </h1>
        <p className="text-gray-700 mb-10">
          Connect instantly! Invite friends or join a room to start chatting.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-6">
          <button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
            onClick={() => navigate("/chatcode")}
          >
            Invite Chat
          </button>

          <button
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all"
            onClick={() => navigate("/username")}
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
