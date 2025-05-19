import { useState, useEffect, useRef } from "react";
import Admin_KCList from "./Admin_kcList";
import { useNavigate } from "react-router-dom";
import AddQuestionModal from "./Create/Admin_AddKCModal";

export default function KCPage({ moduleID }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  //const [IsLoading, setIsLoading] = useState();
  const [KCQA, setKCQA] = useState([]);
  //const [Error, setError] = useState();

  const moduleQuestions = KCQA.filter((item) => item.moduleid === moduleID);
  const navigate = useNavigate();
  const addQuestionModalRef = useRef();

  const handleAddQuestion = () => {
    if (addQuestionModalRef.current) {
      addQuestionModalRef.current.openModal();
    }
  };
  // useEffect(() => {
  //   const fetchKCQuestions = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch("http://localhost:5000/api/kc");

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch KC questions");
  //       }

  //       const data = await response.json();
  //       setKCQA(data);
  //     } catch (err) {
  //       setError(err.message);
  //       console.error("Error fetching KC questions:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  useEffect(() => {
    fetch("http://localhost:5000/api/kc")
      .then((res) => res.json())
      .then((data) => setKCQA(data))
      .catch((err) => console.error(err));
    console.log("KCQA:");
  }, []);

  console.log(KCQA);

  //   fetchKCQuestions();
  //   console.log("KCQA");

  //   console.log(KCQA);
  // }, [moduleID]);

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
      <AddQuestionModal
        ref={addQuestionModalRef}
        moduleID={moduleID}
        setKCQA={setKCQA}
      />
      <div className="w-100 px-3 px-md-5">
        <div className="row g-0 m-0 mt-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 p-0">
            <div className="glass p-4 rounded shadow-sm">
              <div className="d-flex">
              <button
                className="btn btn-sm btn-info mt-1 ms-auto"
                onClick={handleAddQuestion}
                title="Add new question"
              >
                + Add
              </button>
              </div>
              <Admin_KCList
                KCQA={KCQA}
                moduleID={moduleID}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                incorrectAnswers={incorrectAnswers}
                correctAnswers={correctAnswers}
                KCCheckQA={KCCheckQA}
                setKCQA={setKCQA}
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
