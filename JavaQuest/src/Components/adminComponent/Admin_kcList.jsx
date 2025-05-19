import { useEffect, useRef, useState } from "react";
import Admin_KCItems from "./Admin_kcItems";
import Swal from "sweetalert2";
export default function Admin_KCList({
  KCQA,
  moduleID,
  setSelectedAnswers,
  incorrectAnswers,
  correctAnswers,
  KCCheckQA,
  setKCQA,
}) {
  const [isLoading, setIsLoading] = useState("");
  console.log(isLoading);
  const refs = useRef({}); // Store refs for each question

  // Scroll to first incorrect item after submit
  useEffect(() => {
    if (incorrectAnswers.length > 0) {
      const firstWrongId = incorrectAnswers[0];
      const el = refs.current[firstWrongId];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [incorrectAnswers]);

  const handleAnswerSelected = (id, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  const handleDeleteQuestion = async (_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/kc/${_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      setKCQA((prev) => prev.filter((q) => q._id !== _id));

      await Swal.fire("Deleted!", "The question has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting question:", error);
      await Swal.fire("Error", "Failed to delete the question.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuestion = async (_id, updatedData) => {
    const result = await Swal.fire({
      title: "Save changes?",
      text: "Do you want to update this question?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) return;
    console.log(updatedData);
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/kc/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: updatedData.question,
          choices: updatedData.choices,
          answer: updatedData.correctAnswer,
          moduleID: moduleID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      const updatedQuestion = await response.json();
      setKCQA((prev) => prev.map((q) => (q._id === _id ? updatedQuestion : q)));

      await Swal.fire("Updated!", "The question has been updated.", "success");
    } catch (error) {
      console.error("Error updating question:", error);
      await Swal.fire("Error", "Failed to update the question.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const moduleQuestions = KCQA.filter((item) => item.moduleid === moduleID);

  return (
    <div className="container px-3 px-md-5 d-flex flex-column align-items-center">
      <div className="w-100">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h3 className="text-white">Knowledge Checkpoint</h3>
        </div>

        <hr className="text-white mx-auto d-block" />
        <p className="text-white text-center">
          Now that you’ve journeyed through the lesson, it’s time to take a
          quick breather and check how much you've absorbed...
        </p>

        {moduleQuestions.map((item) => (
          <div key={item.id} ref={(el) => (refs.current[item.id] = el)}>
            <Admin_KCItems
              _id={item._id}
              id={item.id}
              question={item.question}
              choices={item.choices}
              onAnswerSelected={handleAnswerSelected}
              isIncorrect={incorrectAnswers.includes(item.id)}
              isCorrect={correctAnswers.includes(item.id)}
              handleUpdateQuestion={handleUpdateQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          </div>
        ))}
      </div>
      {/* <AddQuestionModal
        ref={addQuestionModalRef}
        moduleID={moduleID}
        setKCQA={setKCQA}
      /> */}
      <div className="text-center mt-4">
        <button className="gradient" onClick={KCCheckQA}>
          Submit
        </button>
      </div>
    </div>
  );
}
