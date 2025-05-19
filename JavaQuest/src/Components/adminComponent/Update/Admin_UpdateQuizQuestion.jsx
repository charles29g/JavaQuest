import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function UpdateQuestionModal({ isOpen, onClose, questionData, onUpdate }) {
  const [data, setData] = useState({
    _id: "",
    id: "",
    question: "",
    choices: ["", "", "", ""],
    answer: "",
  });

  useEffect(() => {
    if (isOpen && questionData) {
      setData({
        _id: questionData._id || "",
        id: questionData.id || "",
        question: questionData.question || "",
        choices: questionData.choices ? [...questionData.choices] : ["", "", "", ""],
        answer: questionData.answer || "",
      });
    }
  }, [isOpen, questionData]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...data.choices];
    newChoices[index] = value;
    setData((prev) => ({
      ...prev,
      choices: newChoices,
      answer: newChoices.includes(prev.answer) ? prev.answer : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Update Question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/questions/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Failed to update");

      onUpdate(updated);
      Swal.fire("Updated!", "Question updated successfully.", "success");
      onClose();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop show d-flex w-100 justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="modal-dialog" style={{ maxWidth: "700px", width: "90%" }}>
        <div className="modal-content glass w-100 corner">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title text-white">Update Question</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body text-white">
              <div className="mb-3">
                <label className="form-label descfont">Question Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.id}
                  onChange={(e) => setData({ ...data, id: e.target.value })}
                  required
                />
                <label className="form-label descfont mt-3">Question</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.question}
                  onChange={(e) => setData({ ...data, question: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label descfont">Choices</label>
                {data.choices.map((choice, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    placeholder={`Choice ${index + 1}`}
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    required
                  />
                ))}
              </div>

              <div className="mb-3">
                <label className="form-label descfont">Correct Answer</label>
                <select
                  className="form-select"
                  value={data.answer}
                  onChange={(e) => setData({ ...data, answer: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select correct answer
                  </option>
                  {data.choices.map((choice, idx) =>
                    choice ? (
                      <option key={idx} value={choice}>
                        {choice}
                      </option>
                    ) : null
                  )}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary descfont w-100 glow-on-hover"
                style={{ backgroundColor: "#033592" }}
              >
                Update Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
