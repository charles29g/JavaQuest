import { useState, useEffect } from "react";
//import { Q1 } from "../data.js";
import QuizQuestion from "./quizQuestion";
import { useNavigate } from "react-router-dom";

export default function Quiz({ moduleID }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [disabled, setDisabled] = useState(false); // ✅
  const [Q1, setQ1] = useState([]);
  const navigate = useNavigate();
  const questions = Q1.filter((q) => q.moduleid === moduleID);
  // Fetch questions from the backend
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/questions?moduleid=${moduleID}`
        );
        const data = await res.json();
        setQ1(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    }

    fetchQuestions();
  }, [moduleID]);
  const handleSelect = (id, answer) => {
    if (!disabled) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [id]: answer,
      }));
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    const correct = [];
    const incorrect = [];

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        newScore += 1;
        correct.push(q.id);
      } else {
        incorrect.push(q.id);
      }
    });

    setScore(newScore);
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
    setDisabled(true); // ✅ lock answers
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setScore(null);
    setDisabled(false); // ✅ unlock
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
            isCorrect={correctAnswers.includes(q.id)}
            isIncorrect={incorrectAnswers.includes(q.id)}
            disabled={disabled} // ✅ pass prop
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
                {percentage >= 70 ? "✅ Passed!" : "❌ Not Yet"}
              </h4>
              <p className="text-white">
                Your answers are locked. Try again to retake the quiz.
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn gradient6 text-white mt-3 me-3" // ✅ me-3 for margin-right
                  onClick={handleRetry}
                >
                  🔁 Try Again
                </button>
                <button
                  className="btn btn-light mt-3"
                  onClick={() => navigate("/")}
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
