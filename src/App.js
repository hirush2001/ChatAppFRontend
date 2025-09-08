/*
import ChatBox from "./components/ChatBox";
import MessageBox from "./components/MessageInput";
import { useState } from "react";


export default function App() {
  const [username, setUsername] = useState("");
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
        
        <button
          onClick={handleSetName}
          className="w-full py-3 rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
        >
          🚀 Join Chat
        </button>
      </div>
      

      ) : (
        <div>
          <h2>Welcome, {username}</h2>
          <ChatBox myName={username} />
          <MessageBox username={username} />
        </div>
      )}
    </div>
  );
}
*/
/*
import ChatBox from "./components/ChatBox";
import MessageBox from "./components/MessageInput";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // replace with your backend URL if deployed

export default function App() {
  const [username, setUsername] = useState("");
  const [hasName, setHasName] = useState(false);
  const [messages, setMessages] = useState([]); // Add messages state

  const handleSetName = () => {
    if (username.trim()) {
      setHasName(true);
    }
  };

  // --- Add this useEffect for receiving messages ---
  useEffect(() => {
    // Receive chat history from server
    socket.on("chat history", (messages) => {
      setMessages(messages); // set messages from MongoDB
    });

    // Receive new messages in real-time
    socket.on("chat message", ({ sender, message }) => {
      setMessages((prev) => [...prev, { sender, message }]);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("chat message");
      socket.off("chat history");
    };
  }, []);

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

          <button
            onClick={handleSetName}
            className="w-full py-3 rounded-xl bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-500 hover:scale-105 transform transition duration-300"
          >
            🚀 Join Chat
          </button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}</h2>
          <ChatBox myName={username} messages={messages} />
          <MessageBox username={username} socket={socket} />
        </div>
      )}
    </div>
  );
}
*/