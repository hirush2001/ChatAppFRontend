
import { useState,useEffect } from "react";
import io from "socket.io-client";
import { decrypt } from "../utils/cryptoHelper";

const socket = io("http://localhost:5000");

export default function ChatBox({ myName }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat message", ({ sender, message }) => {
      const decrypted = decrypt(message);
      setMessages((prev) => [...prev, { sender, text: decrypted }]);
    });

    return () => socket.off("chat message");
  }, []);

  return (
    <div style={{ border: "1px solid black", padding: "10px", height: "250px", overflowY: "auto" }}>
      {messages.map((msg, i) => (
        <p
          key={i}
          style={{
            textAlign: msg.sender === myName ? "right" : "left",
            background: msg.sender === myName ? "#cce5ff" : "#e2e2e2",
            padding: "5px 10px",
            borderRadius: "8px",
            maxWidth: "60%",
            margin: msg.sender === myName ? "5px auto 5px 40%" : "5px 40% 5px auto",
          }}
        >
          <strong>{msg.sender}:</strong> {msg.text}
        </p>
      ))}
    </div>
  );
}
