import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";

import Swal from "sweetalert2";
const AddQuestionModal = forwardRef(({ moduleID, setKCQA }, ref) => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [answer, setCorrectAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setID] = useState(0);

  const modalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      if (!modalRef.current) {
        modalRef.current = new window.bootstrap.Modal(
          document.getElementById("addQuestionModal")
        );
      }
      modalRef.current.show();
    },
  }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const filteredChoices = choices.filter((c) => c.trim() !== "");
    const numericId = Number(id);
    const numericModuleId = Number(moduleID);

    // Validation
    if (
      isNaN(numericId) ||
      isNaN(numericModuleId) ||
      !question.trim() ||
      filteredChoices.length < 2 ||
      !answer.trim()
    ) {
      Swal.fire(
        "Invalid Input",
        "Please fill in all fields correctly.",
        "warning"
      );
      setIsSubmitting(false);
      return;
    }

    const data = {
      id: numericId,
      moduleid: numericModuleId,
      question,
      choices: filteredChoices,
      answer,
    };

    // Confirmation before submission
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this question?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      setIsSubmitting(false);
      return;
    }

    // Proceed with submission
    try {
      const response = await fetch("http://localhost:5000/api/kc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok)
        throw new Error(resData.message || "Failed to add question");

      setKCQA((prev) => [...prev, resData]);
      modalRef.current.hide();
      // resetForm();

      Swal.fire("Success", "Question added successfully!", "success");
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChoiceChange = (index, value) => {
    setChoices((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  // Get non-empty choices for the dropdown
  const nonEmptyChoices = choices.filter((choice) => choice.trim() !== "");

  // Update correct answer if it's no longer in choices
  useEffect(() => {
    if (
      answer &&
      nonEmptyChoices.length > 0 &&
      !nonEmptyChoices.includes(answer)
    ) {
      setCorrectAnswer("");
    }
  }, [nonEmptyChoices, answer]);

  return (
    <div
      className="modal fade"
      id="addQuestionModal"
      tabIndex="-1"
      aria-labelledby="addQuestionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content glass corner">
          <form onSubmit={handleSubmit}>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h2
                className="modal-title w-100 text-center"
                id="addQuestionModalLabel"
                style={{ color: "#fff" }}
              >
                Add Question
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ filter: "invert(1)" }}
              />
            </div>
            <div className="modal-body" style={{ color: "#fff" }}>
              <div className="mb-3">
                <label className="form-label">Question Number/ID</label>
                <input
                  type="number"
                  className="form-control glass"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                  required
                  style={inputStyle}
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Question</label>
                <input
                  type="text"
                  className="form-control glass"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  style={inputStyle}
                  disabled={isSubmitting}
                />
              </div>

              {choices.map((choice, idx) => (
                <div className="mb-3" key={idx}>
                  <label className="form-label">
                    {`Choice ${idx + 1}${idx < 2 ? " *" : ""}`}
                  </label>
                  <input
                    type="text"
                    className="form-control glass"
                    value={choice}
                    onChange={(e) => handleChoiceChange(idx, e.target.value)}
                    required={idx < 2}
                    style={inputStyle}
                    disabled={isSubmitting}
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="form-label">Correct Answer</label>
                <select
                  className="form-select glass"
                  value={answer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  required
                  style={inputStyle}
                  disabled={nonEmptyChoices.length < 2 || isSubmitting}
                >
                  <option value="">Select correct answer</option>
                  {nonEmptyChoices.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
                {nonEmptyChoices.length < 2 && (
                  <small className="text-warning">
                    Please enter at least 2 choices first
                  </small>
                )}
              </div>
            </div>
            <div className="modal-footer" style={{ borderTop: "none" }}>
              <button
                type="submit"
                className="btn btn-success w-100"
                style={{ padding: "0.75rem", borderRadius: "10px" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Question"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

const inputStyle = {
  borderRadius: "10px",
  padding: "0.75rem",
  color: "#fff",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

export default AddQuestionModal;
