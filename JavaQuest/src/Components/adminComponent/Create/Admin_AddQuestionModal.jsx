import React, { forwardRef, useImperativeHandle, useState } from "react";
import Swal from "sweetalert2";

const AddQuestionModal = forwardRef(({ moduleID, setQuestions }, ref) => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [id, setID] = useState()

  useImperativeHandle(ref, () => ({
    openModal() {
      const modal = new window.bootstrap.Modal(document.getElementById("addQuestionModal"));
      modal.show();
    },
  }));

  const handleChoiceChange = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!choices.includes(answer)) {
      return Swal.fire("Error", "Correct answer must be one of the choices.", "error");
    }

    const result = await Swal.fire({
      title: "Add this question?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
    });

    if (!result.isConfirmed) return;

    const newQuestion = {
        id,
      moduleid: moduleID,
      question,
      choices,
      answer,
    };

    try {
      const res = await fetch("http://localhost:5000/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });

      const created = await res.json();
      if (!res.ok) throw new Error(created.error || "Failed to add question");

      setQuestions((prev) => [...prev, created]);

      window.bootstrap.Modal.getInstance(document.getElementById("addQuestionModal")).hide();
      setQuestion("");
      setChoices(["", "", "", ""]);
      setAnswer("");

      Swal.fire("Success", "Question added successfully!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const inputStyle = {
    borderRadius: "10px",
    padding: "0.75rem",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  };

  return (
    <div className="modal fade" id="addQuestionModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content glass corner">
          <form onSubmit={handleSubmit}>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h2 className="modal-title text-white w-100 text-center">Add New Question</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body text-white">
              <div className="mb-3">
                 <label className="form-label">Question Number</label>
                <input
                  type="text"
                  className="form-control"
                  style={inputStyle}
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  required
                />
                <label className="form-label">Question</label>
                <input
                  type="text"
                  className="form-control"
                  style={inputStyle}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
              {choices.map((choice, i) => (
                <div className="mb-2" key={i}>
                  <label className="form-label">Choice {i + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    style={inputStyle}
                    value={choice}
                    onChange={(e) => handleChoiceChange(i, e.target.value)}
                    required
                  />
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label">Correct Answer</label>
                <select
                  className="form-select"
                  style={inputStyle}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                >
                  <option value="">-- Select Correct Answer --</option>
                  {choices.map(
                    (choice, i) =>
                      choice && (
                        <option key={i} value={choice}>
                          {choice}
                        </option>
                      )
                  )}
                </select>
              </div>
              <button type="submit" className="btn btn-success w-100 mt-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default AddQuestionModal;
