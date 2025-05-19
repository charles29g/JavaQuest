import { useEffect, useState, useRef } from "react";
import Admin_QuizQuestion from "./Admin_quizQuestion.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateQuestionModal from "./Update/Admin_UpdateQuizQuestion.jsx";
import AddQuestionModal from "./Create/Admin_AddQuestionModal.jsx";

export default function Quiz({ moduleID }) {
  const [questions1, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const questions = questions1.filter((q) => q.moduleid === moduleID);

  const navigate = useNavigate();
  const modalRef = useRef();
  const addModalRef = useRef();
  const handleAdd = () => {
    addModalRef.current.openModal();
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/questions?moduleid=${moduleID}`
        );
        const data = await res.json();
        setQuestions(data);
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
    setDisabled(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setScore(null);
    setDisabled(false);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This question will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/api/questions/${id}`, {
          method: "DELETE",
        });

        setQuestions((prev) => prev.filter((q) => q.id !== id));

        Swal.fire("Deleted!", "Question has been removed.", "success");
      } catch (err) {
        console.error("Failed to delete:", err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handleEdit = (question) => {
    modalRef.current.openModal(question);
  };

  const handleUpdate = (updated) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
  };

  const percentage =
    score !== null ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="backgroundimg4 min-vh-100 px-3 py-5">
      <div className="container glass p-4 rounded shadow">
        <h2 className="text-white text-center mb-4">🧪 Final Quiz</h2>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-white mb-0">Questions</h4>
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Add Question
          </button>
        </div>

        {questions.map((q) => (
          <Admin_QuizQuestion
            key={q.id}
            _id={q.id}
            id={q.id}
            question={q.question}
            choices={q.choices}
            selected={selectedAnswers[q.id]}
            onSelect={handleSelect}
            isCorrect={correctAnswers.includes(q.id)}
            isIncorrect={incorrectAnswers.includes(q.id)}
            disabled={disabled}
            onDelete={() => handleDelete(q.id)}
            onEdit={() => handleEdit(q)}
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
                  className="btn gradient6 text-white mt-3 me-3"
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
      <AddQuestionModal
        ref={addModalRef}
        moduleID={moduleID}
        setQuestions={setQuestions}
      />

      <UpdateQuestionModal ref={modalRef} onUpdate={handleUpdate} />
    </div>
  );
}
