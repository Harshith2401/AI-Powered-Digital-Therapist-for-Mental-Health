import React, { useState } from "react";
import "./MoodTracker.css";

const questions = [
  { id: 1, text: "How are you feeling today?", options: ["Happy", "Sad", "Anxious", "Excited"] },
  { id: 2, text: "Did you get enough sleep last night?", options: ["Yes", "No"] },
  { id: 3, text: "How was your day overall?", options: ["Great", "Okay", "Bad"] },
  { id: 4, text: "Are you feeling stressed about anything?", options: ["Yes", "No"] },
  { id: 5, text: "Do you feel motivated today?", options: ["Yes", "No"] },
];

const analyzeMood = (responses) => {
  let moodScore = 0;

  responses.forEach((response) => {
    if (["Happy", "Excited", "Great", "Yes"].includes(response)) moodScore += 2;
    else if (["Okay"].includes(response)) moodScore += 1;
    else if (["Sad", "Anxious", "Bad", "No"].includes(response)) moodScore -= 2;
  });

  if (moodScore >= 6) return "😃 Super Happy!";
  if (moodScore >= 3) return "🙂 Feeling Good!";
  if (moodScore >= 0) return "😐 Neutral Mood";
  return "😞 Feeling Down...";
};

const App = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [mood, setMood] = useState(null);

  const handleAnswer = (answer) => {
    const newResponses = [...responses, answer];
    setResponses(newResponses);

    if (step === questions.length - 1) {
      setMood(analyzeMood(newResponses));
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="container">
      <h1>Mood Tracker</h1>
      <br></br>

      {mood ? (
        <div className="result">
          <h2>Your Mood: {mood}</h2>
          <button onClick={() => { setStep(0); setResponses([]); setMood(null); }}>Try Again</button>
        </div>
      ) : (
        <div className="popup">
          <h3>{questions[step].text}</h3>
          <div className="options">
            {questions[step].options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;