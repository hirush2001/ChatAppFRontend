import { useState, useEffect } from "react";
import io from "socket.io-client";
import { encrypt, decrypt } from "../utils/cryptoHelper";

const socket = io("http://localhost:5000");

export default function MessageBox({ username }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim()) {
      const encrypted = encrypt(input);
      socket.emit("chat message", { sender: username, message: encrypted });
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("chat message", ({ sender, message }) => {
      const decrypted = decrypt(message);
      setMessages((prev) => [...prev, { sender, text: decrypted }]);
    });

    return () => socket.off("chat message");
  }, []);

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "250px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <p
            key={i}
            style={{
              textAlign: msg.sender === username ? "right" : "left",
              background: msg.sender === username ? "#cce5ff" : "#e2e2e2",
              padding: "5px 10px",
              borderRadius: "8px",
              maxWidth: "60%",
              margin:
                msg.sender === username
                  ? "5px auto 5px 40%"
                  : "5px 40% 5px auto",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none placeholder-gray-400 text-gray-800 transition duration-200"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Send 🚀
        </button>
      </div>
    </>
  );
}
