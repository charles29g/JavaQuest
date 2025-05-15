import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Undo2 } from "lucide-react";
import Swal from "sweetalert2";

export default function Admin_ModuleItem({ setModuleItems }) {
  const { state } = useLocation();
  const _id = state._id;
  const navigate = useNavigate();

  // States for inputs
  const [name, setName] = useState(state.moduleName);
  const [quiz, setQuiz] = useState(state.moduleQuiz);
  const [image, setImage] = useState(state.img_path);
  const [id, setCustomId] = useState(state.id);
  const [publish, setPublish] = useState(state.publish || false);

  // New QuizConfig state, default from state.quizConfig or 'lock'
  const [QuizConfig, setQuizConfig] = useState(state.quizConfig || "lock");

  const handleUpdate = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This will update the module information.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/modules/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(id),
          moduleName: name,
          moduleQuiz: quiz,
          img_path: image,
          publish: publish,
          quizConfig: QuizConfig,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update module");
      }

      setModuleItems((prevItems) =>
        prevItems.map((item) =>
          item._id === _id ? { ...item, ...result } : item
        )
      );

      await Swal.fire({
        title: "Updated!",
        text: "The module has been successfully updated.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      navigate("/Adminmodules");
    } catch (err) {
      console.error("❌ Error updating module:", err.message);
      Swal.fire("Error", "Failed to update module. Please try again.", "error");
    }
  };

  return (
    <div className="container-fluid backgroundimg2 min-vh-100 d-flex flex-column">
      <div className="card p-5 m-5 corner gradient3 shadow-card">
        <h3 className="text-white descfont">Update Module Information</h3>
        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn rounded-5 btn-info d-flex align-items-center justify-content-center text-white glow-on-hover descfont"
            style={{
              width: "120px",
              height: "50px",
              backgroundColor: "#033592",
              border: "none",
            }}
            onClick={() => navigate("/Adminmodules")}
          >
            <Undo2 className="me-2" /> Back
          </button>
        </div>

        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-5 text-center">
            <img
              src={image}
              className="imgsize2 animate__animated slow-bounce animate__pulse animate__infinite"
              alt="Module"
            />
          </div>

          <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
            <div className="d-flex flex-column gap-2">
              <label className="form-label descfont text-white">
                Module Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Module Name"
              />

              <label className="form-label descfont text-white">
                Module Quiz Name
              </label>
              <input
                type="text"
                value={quiz}
                onChange={(e) => setQuiz(e.target.value)}
                className="form-control"
                placeholder="Module Quiz"
              />

              <label className="form-label descfont text-white">
                Module Number
              </label>
              <input
                type="number"
                value={id}
                onChange={(e) => setCustomId(e.target.value)}
                className="form-control"
                placeholder="Module ID"
              />

              <label className="form-label descfont text-white">
                Module Image Link
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-control"
                placeholder="Module Image Link"
              />

              {/* Publish Checkbox */}
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="publishCheck"
                  checked={publish}
                  onChange={(e) => setPublish(e.target.checked)}
                />
                <label
                  className="form-check-label descfont text-white"
                  htmlFor="publishCheck"
                >
                  Publish
                </label>
              </div>

              {/* QuizConfig Radio Buttons */}
              <label className="form-label descfont text-white mt-3">
                Quiz Configuration
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="quizConfig"
                  id="lockQuiz"
                  value="lock"
                  checked={QuizConfig === "lock"}
                  onChange={(e) => setQuizConfig(e.target.value)}
                />
                <label
                  className="form-check-label descfont text-white"
                  htmlFor="lockQuiz"
                >
                  Lock Module Quiz
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="quizConfig"
                  id="openQuiz"
                  value="open"
                  checked={QuizConfig === "open"}
                  onChange={(e) => setQuizConfig(e.target.value)}
                />
                <label
                  className="form-check-label descfont text-white"
                  htmlFor="openQuiz"
                >
                  Open Module Quiz
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="quizConfig"
                  id="openUponCompletion"
                  value="openUponCompletion"
                  checked={QuizConfig === "openUponCompletion"}
                  onChange={(e) => setQuizConfig(e.target.value)}
                />
                <label
                  className="form-check-label descfont text-white"
                  htmlFor="openUponCompletion"
                >
                  Open Upon Module Completion
                </label>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-primary descfont w-50 glow-on-hover"
                  style={{ backgroundColor: "#033592" }}
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
