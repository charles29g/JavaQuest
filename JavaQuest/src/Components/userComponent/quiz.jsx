// quiz.jsx
import { useState } from "react";
import { Q1 } from "../data.js"; // Adjust the path based on where you store it
import QuizQuestion from "./quizQuestion"; // Create this similar to KCItems
import { useNavigate } from "react-router-dom";

export default function Quiz({ moduleID }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  const questions = Q1.filter((q) => q.moduleid === moduleID);

  const handleSelect = (id, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const percentage =
    score !== null ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="backgroundimg4 min-vh-100 px-3 py-5">
      <div className="container glass p-4 rounded shadow">
        <h2 className="text-white text-center mb-4">🧪 Final Quiz</h2>

        {questions.map((q) => (
          <QuizQuestion
            key={q.id}
            id={q.id}
            question={q.question}
            choices={q.choices}
            selected={selectedAnswers[q.id]}
            onSelect={handleSelect}
          />
        ))}

        <div className="text-center mt-4">
          {score === null ? (
            <button className="btn gradient6 text-white" onClick={handleSubmit}>
              Submit Quiz
            </button>
          ) : (
            <>
              <h4 className="text-white mt-3">
                Your Score: {percentage}%{" "}
                {percentage >= 70 ? "✅ Passed!" : "❌ Try Again"}
              </h4>
              <button
                className="btn btn-light mt-3"
                onClick={() => navigate("/")}
              >
                Back to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
