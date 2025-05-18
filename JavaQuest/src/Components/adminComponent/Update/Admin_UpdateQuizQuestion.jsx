import React, { forwardRef, useImperativeHandle, useState } from "react";
import Swal from "sweetalert2";

const UpdateQuestionModal = forwardRef(({ onUpdate }, ref) => {
  const [data, setData] = useState({
    _id: "",
    id: "",
    question: "",
    choices: ["", "", "", ""],
    answer: "",
  });

  useImperativeHandle(ref, () => ({
    openModal(questionData) {
      setData({
        _id: questionData._id,
        id: questionData.id,

        question: questionData.question,
        choices: [...questionData.choices],
        answer: questionData.answer,
      });
      const modal = new window.bootstrap.Modal(
        document.getElementById("updateQuestionModal")
      );
      modal.show();
    },
  }));

  const handleChoiceChange = (index, value) => {
    const newChoices = [...data.choices];
    newChoices[index] = value;
    setData((prev) => ({
      ...prev,
      choices: newChoices,
      // Reset answer if it's no longer among the updated choices
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
      const res = await fetch(
        `http://localhost:5000/api/questions/${data._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Failed to update");

      onUpdate(updated);
      window.bootstrap.Modal.getInstance(
        document.getElementById("updateQuestionModal")
      ).hide();
      Swal.fire("Updated!", "Question updated successfully.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="modal fade" id="updateQuestionModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content glass corner">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title text-white">Update Question</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body text-white">
              <div className="mb-3">
                <label className="form-label">Question Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.id}
                  onChange={(e) => setData({ ...data, id: e.target.value })}
                  required
                />
                <label className="form-label">Question</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.question}
                  onChange={(e) =>
                    setData({ ...data, question: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Choices</label>
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
                <label className="form-label">Correct Answer</label>
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

              <button type="submit" className="btn btn-success w-100">
                ✅ Update Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default UpdateQuestionModal;
