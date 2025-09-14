
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { encrypt, decrypt } from "../utils/cryptoHelper";

const socket = io("http://localhost:5000");

/*
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

  */
/*
  export default function MessageBox({ username, otp }) { // ✅ pass otp as prop
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
  
    const handleSend = () => {
      if (input.trim()) {
        const encrypted = encrypt(input);
        console.log("📤 Sending to backend:", { otp, sender: username, message: encrypted }); // Debug log
        socket.emit("chat message", { otp, sender: username, message: encrypted }); // ✅ Send OTP
        setInput("");
      }
    };
  
    useEffect(() => {
      socket.on("chat message", ({ sender, message }) => {
        const decrypted = decrypt(message);
        setMessages((prev) => [...prev, { sender, text: decrypted }]);
      });
  
      return () => socket.off("chat message");
    }, [otp]);
  
  
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

*/

/*
export default function MessageBox({ username, otp }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim()) {
      const encrypted = encrypt(input);
      console.log("📤 Sending to backend:", { otp, sender: username, message: encrypted }); // Debug log
      socket.emit("chat message", { otp, sender: username, message: encrypted }); // ✅ Send OTP
      setInput("");
    }
  };

  useEffect(() => {
    socket.on("chat message", ({ sender, message }) => {
      const decrypted = decrypt(message);
      setMessages((prev) => [...prev, { sender, text: decrypted }]);
    });

    return () => socket.off("chat message");
  }, [otp]);

  return (
    <div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}><b>{msg.sender}</b>: {msg.text}</li>
        ))}
      </ul>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

*/

export default function MessageBox({ username, otp }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (input.trim()) {
      const encrypted = encrypt(input);
  
      // ✅ Immediately add your message to the UI
      setMessages((prev) => [...prev, { sender: username, text: input }]);
  
      // ✅ Send encrypted message to backend
      socket.emit("chat message", { otp, sender: username, message: encrypted });
  
      setInput("");
    }
  };
  

  useEffect(() => {
    if (!otp) return;
  
    // ✅ Join the room with the current OTP
    socket.emit("joinRoom", otp);
  
    // Listen for messages
    socket.on("chat message", ({ sender, message }) => {
      const decrypted = decrypt(message);
      setMessages((prev) => [...prev, { sender, text: decrypted }]);
    });
  
    // Optional: listen for OTP status
    socket.on("otp-status", (res) => {
      console.log("OTP status:", res);
    });
  
    // Cleanup listeners on unmount or OTP change
    return () => {
      socket.off("chat message");
      socket.off("otp-status");
    };
  }, [otp]);

  return (
    <div className="flex flex-col w-full h-[500px] max-w-md bg-white shadow-lg rounded-xl overflow-hidden">
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words
              ${msg.sender === username ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-800"}`}
            >
              <b>{msg.sender}</b>: {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex p-4 border-t border-gray-200 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-r-xl hover:bg-yellow-500 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

