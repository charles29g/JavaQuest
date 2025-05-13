import { useState } from "react";
import Admin_KCList from "./Admin_kcList";
import { useNavigate } from "react-router-dom";

export default function KCPage({ KCQA, moduleID }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);



  const moduleQuestions = KCQA.filter((item) => item.moduleid === moduleID);
  const navigate = useNavigate();


  function KCCheckQA() {
    let calculatedScore = 0;
    const wrong = [];
    const correct = [];

    KCQA.forEach((item) => {
      if (selectedAnswers[item.id] === item.answer) {
        calculatedScore += 1;
        correct.push(item.id);
      } else {
        wrong.push(item.id);
      }
    });

    setScore(calculatedScore);
    setIncorrectAnswers(wrong);
    setCorrectAnswers(correct);
  }

  const batteryPercent =
    score !== null ? `${(score / moduleQuestions.length) * 100}%` : "0%";

  return (
    <div className="backgroundimg4 min-vh-100 d-flex">
      <div className="w-100 px-3 px-md-5">
        <div className="row g-0 m-0 mt-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 p-0">
            <div className="glass p-4 rounded shadow-sm">
              <Admin_KCList
                KCQA={KCQA}
                moduleID={moduleID}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                incorrectAnswers={incorrectAnswers}
                correctAnswers={correctAnswers}
                KCCheckQA={KCCheckQA}
              />
            </div>
          </div>

          <div className="col-12 col-md-10 col-lg-8 col-xl-6 p-0">
            <div
              className="position-sticky d-flex flex-column align-items-center"
              style={{ top: "10px", zIndex: 1000 }}
            >
              <img
                src="/images/Module/c2.png"
                className="w-100 mt object-fit-contain animate__animated animate__infinite flying-car"
                alt="c2"
              />

              <div className="battery-container mt-3 animate__animated animate__infinite flying-car">
                <div className="battery-meter">
                  <div
                    className="battery-level"
                    style={{ width: batteryPercent }}
                  ></div>
                </div>
                <span className="battery-text text-white">
                  {score !== null
                    ? `${Math.round((score / moduleQuestions.length) * 100)}%`
                    : "0%"}
                </span>
              </div>
              <div className="text-center mt-4 animate__animated animate__infinite flying-car">

                {score !== null && score / KCQA.length >= 0.7 ? (
                  <button
                    className="gradient6 btn text-white"
                    onClick={() => navigate("/AdminquizInstructions")}
                  >
                    Take Quiz!
                  </button>
                ) : (
                  <p className="text-white">
                    You need at least 70% battery charge to fly to the quiz.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
