import { useNavigate } from "react-router-dom";
export default function QuizPageInstructions({ moduleID, ModuleItems }) {
  console.log("moduleID:", moduleID);
  console.log("ModuleItems:", ModuleItems);

  const module = ModuleItems.find((m) => m.id === moduleID);
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    navigate(`/quiz`);
  };

  return (
    <div className="backgroundimg5">
      <div className="container-fluid instructionsbanner rounded d-flex justify-content-center px-4 py-5">
        <div>
          <h2 className="text-center mb-4 text-white">🚀 Quiz Instructions</h2>
          <ul className="fs-5 text-white">
            <li>
              This quiz is based on <strong>({module.moduleName})</strong>.
            </li>
            <li>Answer all questions carefully.</li>
            <li>No going back once you submit.</li>
            <li>You need at least 70% to pass.</li>
            <li>Good luck, pilot! 🧠</li>
          </ul>
          <div className="text-center mt-4">
            <button
              className="gradient6 btn text-white px-4 fs-5"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
