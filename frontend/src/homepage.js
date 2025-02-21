import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Header/Navbar */}
      <header className="navbar">
        <h1 className="logo">AI Therapist</h1>
        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/chatbot" className="nav-item">Chatbot</Link>
          <Link to="/mood-tracker" className="nav-item">Mood Tracker</Link>
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

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to AI Therapist</h1>
        <p>Your personal AI-powered digital therapist, here to listen and help.</p>
        <div className="buttons">
          <Link to="/chatbot" className="btn pulse">Start Chat</Link>
          <Link to="/mood-tracker" className="btn btn-alt">Mood Tracker</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;