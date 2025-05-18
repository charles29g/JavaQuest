import { useState } from "react";
import Swal from "sweetalert2";

export default function Admin_KCItems({
  _id,
  id,
  question,
  choices,
  onAnswerSelected,
  isIncorrect,
  isCorrect,
  handleUpdateQuestion,
  handleDeleteQuestion,
}) {
  //console.log("_id" + _id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedChoices, setEditedChoices] = useState([...choices]);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState(choices[0]); // Default to first choice

  const handleAnswerChange = (e) => {
    onAnswerSelected(_id, e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault(); // prevent default form behavior (just in case)
    Swal.fire({
      title: "Are you sure?",
      text: "This question will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Ensure this doesn't itself call another Swal
        handleDeleteQuestion(_id);
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...editedChoices];
    newChoices[index] = value;
    setEditedChoices(newChoices);
  };

  const handleSave = () => {
    handleUpdateQuestion(_id, {
      question: editedQuestion,
      choices: editedChoices,
      correctAnswer: editedCorrectAnswer,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedQuestion(question);
    setEditedChoices([...choices]);
  };

  const addChoice = () => {
    setEditedChoices([...editedChoices, ""]);
  };

  const removeChoice = (index) => {
    if (editedChoices.length > 1) {
      const newChoices = editedChoices.filter((_, i) => i !== index);
      setEditedChoices(newChoices);
      // If we're removing the correct answer, reset to first choice
      if (editedCorrectAnswer === editedChoices[index]) {
        setEditedCorrectAnswer(newChoices[0]);
      }
    }
  };

  return (
    <div
      className={`container-fluid px-0 text-white mb-4 ${
        isIncorrect
          ? "border border-danger-subtle rounded-3 px-3 bg-danger bg-opacity-10 shadow-sm p-3 animate__animated animate__headShake"
          : isCorrect
          ? "border border-success rounded-3 px-3 bg-success bg-opacity-10 shadow-sm p-3 animate__animated animate__pulse"
          : "bg-dark bg-opacity-10 rounded-3 p-3"
      }`}
    >
      {isEditing ? (
        // Edit Mode
        <div className="edit-mode">
          <div className="mb-3">
            <label className="form-label fw-semibold">Question:</label>
            <textarea
              className="form-control glass mb-2"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Choices:</label>
            {editedChoices.map((choice, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  className="form-control glass"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeChoice(index)}
                  disabled={editedChoices.length <= 1}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              className="btn btn-sm btn-outline-info mt-1"
              onClick={addChoice}
            >
              + Add Choice
            </button>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Correct Answer:</label>
            <select
              className="form-select glass"
              value={editedCorrectAnswer}
              onChange={(e) => setEditedCorrectAnswer(e.target.value)}
            >
              {editedChoices.map((choice, index) => (
                <option key={index} value={choice}>
                  {choice || `Option ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="fw-semibold mb-0">{question}</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-warning"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mb-2">
            {choices.map((choice, index) => (
              <div className="form-check" key={index}>
                <input
                  type="radio"
                  id={`q${id}-choice${index}`}
                  name={`question-${id}`}
                  value={choice}
                  onChange={handleAnswerChange}
                  className="form-check-input"
                />
                <label
                  htmlFor={`q${id}-choice${index}`}
                  className="form-check-label"
                >
                  {choice}
                </label>
              </div>
            ))}
          </div>

          {isIncorrect && (
            <small className="text-danger d-block mt-2 fw-bold">
              🚩 Oops! That didn't power up your car. Try again!
            </small>
          )}

          {isCorrect && (
            <small className="text-success d-block mt-2 fw-bold">
              ✅ Well done! You've successfully powered up your car. Keep it
              going!
            </small>
          )}
        </>
      )}
    </div>
  );
}
