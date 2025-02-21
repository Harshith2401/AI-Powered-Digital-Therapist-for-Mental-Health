import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"; // Import microphone icons
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatboxRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate typing effect for bot response
  const simulateTyping = async (text) => {
    setIsTyping(true);
    let displayedText = "";

    for (let i = 0; i < text.length; i++) {
      displayedText += text[i];
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { text: displayedText, sender: "bot" },
      ]);
      await new Promise((resolve) => setTimeout(resolve, 25)); // Adjust typing speed here
    }

    setIsTyping(false);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: input,
      });

      // Simulate typing effect for bot response
      await simulateTyping(response.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { text: "Sorry, I'm having trouble responding.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="full-screen">
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
          <button
            onClick={handleVoiceInput}
            className={`voice-button ${isListening ? "active" : ""}`}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;