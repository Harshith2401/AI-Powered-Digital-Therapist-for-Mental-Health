import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./homepage";
import Chatbot from "./Chatbot";
// import MoodTracker from "./MoodTracker";
// import CopingStrategies from "./CopingStrategies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        {/*<Route path="/mood-tracker" element={<MoodTracker />} />*/}
        {/*<Route path="/coping-strategies" element={<CopingStrategies />} />*/}
      </Routes>
    </Router>
  );
}

export default App;