import { useState, useEffect } from "react";
import KCList from "./kcList";
import { useNavigate } from "react-router-dom";

export default function KCPage({ moduleID }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [user, setUser] = useState(null);
  const [moduleUpdated, setModuleUpdated] = useState(false);
  const [KCQA, setKCQA] = useState([]);
  const navigate = useNavigate();

  const moduleQuestions = KCQA.filter((item) => item.moduleid === moduleID);
  const passingScore = 0.7;

  const batteryPercent =
    score !== null ? `${(score / moduleQuestions.length) * 100}%` : "0%";
  useEffect(() => {
    fetch("http://localhost:5000/api/kc")
      .then((res) => res.json())
      .then((data) => setKCQA(data))
      .catch((err) => console.error(err));
    console.log("KCQA:");
  }, []);
  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  const updateUserModuleProgress = async (userId, moduleID) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${userId}/completedModules`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({ moduleID }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update module progress");
      }

      const data = await res.json();
      console.log("Module progress updated:", data);
      setModuleUpdated(true);
    } catch (err) {
      console.error("Error updating module progress:", err);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserInfo(token).then((userData) => {
        if (userData) {
          setUser(userData);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (
      user &&
      score !== null &&
      score / moduleQuestions.length >= passingScore &&
      !moduleUpdated
    ) {
      updateUserModuleProgress(user._id, moduleID);
    }
  }, [score, user, moduleUpdated]);

  function KCCheckQA() {
    let calculatedScore = 0;
    const wrong = [];
    const correct = [];

    moduleQuestions.forEach((item) => {
      if (selectedAnswers[item.id] === item.answer) {
        calculatedScore += 1;
        correct.push(item.id);
      } else {
        wrong.push(item.id);
      }
    });
    console.log("Selected Answers:", selectedAnswers);
    console.log("Module Questions:", moduleQuestions);

    setScore(calculatedScore);
    setIncorrectAnswers(wrong);
    setCorrectAnswers(correct);
  }

  return (
    <div className="backgroundimg4 min-vh-100 d-flex">
      <div className="w-100 px-3 px-md-5">
        <div className="row g-0 m-0 mt-5">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 p-0">
            <div className="glass p-4 rounded shadow-sm">
              <KCList
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
                {score !== null &&
                score / moduleQuestions.length >= passingScore ? (
                  <button
                    className="gradient6 btn text-white"
                    onClick={() => navigate("/modules")}
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
