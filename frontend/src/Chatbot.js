import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: input,
      });

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { text: "Sorry, I'm having trouble responding.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="logo">AI Therapist</h1>
        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/chatbot" className="nav-item">Chatbot</Link>
          <Link to="/mood-tracker" className="nav-item">MoodTracker</Link>
          <Link to="/coping-strategies" className="nav-item">Coping Strategies</Link>
          <Link to="/profile" className="nav-item">Profile</Link>
          <Link to="/crisis-support" className="nav-item">Crisis Support</Link>
          <Link to="/about" className="nav-item">About Us</Link>
        </nav>
        <div className="nav-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn btn-signup">Sign Up</Link>
        </div>
      </header>

      <div className="chat-container">
        <h2>AI Therapist Chatbot</h2>
        <br />
        <div className="chatbox" ref={chatboxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="message bot typing-indicator">
              <span>Typing...</span>
            </div>
          )}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;