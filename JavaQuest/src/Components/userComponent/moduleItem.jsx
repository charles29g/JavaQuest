import { useNavigate } from "react-router-dom";

export default function ModuleItem({
  user,
  id,
  name,
  quiz,
  img,
  setModuleID,
  quizConfig,
}) {
  const navigate = useNavigate();
  console.log("user", user);
  console.log("id", id);
  // Determine if quiz button should be disabled
  let isDisabled = true;

  if (quizConfig === "open") {
    isDisabled = false;
  } else if (quizConfig === "openUponCompletion") {
    // Check if user.completedModules contains this module id
    if (user && Array.isArray(user.completedModules)) {
      isDisabled = !user.completedModules.includes(id);
    } else {
      isDisabled = true;
    }
  } else {
    isDisabled = true;
  }

  return (
    <div className="card p-5 m-5 corner gradient3 shadow-card">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-5 text-center">
          <img
            src={img}
            className="imgsize2 animate__animated slow-bounce animate__pulse animate__infinite"
            alt="Module"
          />
        </div>

        <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-md-end justify-content-center py-2">
            <button
              className="btn btn-light shadow-button btn-mod text-start w-100 w-md-75 fs-md-5"
              onClick={() => {
                navigate("/lessons");
                setModuleID(id);
              }}
            >
              {name}
            </button>
          </div>

          <div className="d-flex justify-content-md-end justify-content-center py-2">
            <button
              className="btn btn-light shadow-button btn-mod text-start w-100 w-md-75 fs-md-5"
              onClick={() => {
                if (!isDisabled) {
                  navigate("/quizInstructions");
                  setModuleID(id);
                }
              }}
              disabled={isDisabled}
            >
              {quiz} 
            </button>
          </div>

          <div className="d-flex justify-content-md-end justify-content-center py-2">
            {isDisabled && (
              <p className="text-white mt-2 mb-0 small">
                This quiz is currently locked. Please wait for the administrator
                to open it.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
