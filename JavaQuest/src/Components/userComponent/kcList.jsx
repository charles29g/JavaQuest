import { useEffect, useRef } from "react";
import KCItems from "./kcItems";

export default function KCList({
  KCQA,
  moduleID,
  setSelectedAnswers,
  incorrectAnswers,
  correctAnswers,
  KCCheckQA,
}) {
  const refs = useRef({});

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

  const moduleQuestions = KCQA.filter((item) => item.moduleid === moduleID);

  return (
    <div className="container px-3 px-md-5 d-flex flex-column align-items-center">
      <div className="w-100">
        <h3 className="text-white text-center">Knowledge Checkpoint</h3>
        <hr className="text-white mx-auto d-block" />
        <p className="text-white text-center">
          Now that you’ve journeyed through the lesson, it’s time to take a
          quick breather and check how much you've absorbed...
        </p>

        {moduleQuestions.map((item) => (
          <div key={item.id} ref={(el) => (refs.current[item.id] = el)}>
            <KCItems
              moduleID={moduleID}
              id={item.id}
              question={item.question}
              choices={item.choices}
              onAnswerSelected={handleAnswerSelected}
              isIncorrect={incorrectAnswers.includes(item.id)}
              isCorrect={correctAnswers.includes(item.id)}
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="gradient" onClick={KCCheckQA}>
          Submit
        </button>
      </div>
    </div>
  );
}
