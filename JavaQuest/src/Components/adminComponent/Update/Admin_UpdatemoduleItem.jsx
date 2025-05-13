import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Undo2 } from "lucide-react";

export default function Admin_ModuleItem({ setModuleItems }) {
  const { state } = useLocation();
  const _id = state._id;
  console.log(_id);
  const navigate = useNavigate();

  // State for inputs
  const [name, setName] = useState(state.moduleName);
  const [quiz, setQuiz] = useState(state.moduleQuiz);
  const [image, setImage] = useState(state.img_path);

  const [id, setCustomId] = useState(state.id);

  console.log(name);
  console.log(quiz);
  console.log(id);

  const handleUpdate = async () => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this module?"
    );
    if (!confirmUpdate) return;

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
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update module");
      }

      console.log("✅ Module updated:", result);

      // 🔁 Update local module list
      setModuleItems((prevItems) =>
        prevItems.map((item) =>
          item._id === _id ? { ...item, ...result } : item
        )
      );

      // Optional: navigate back or show a success message
      alert("Module updated successfully!");
    } catch (err) {
      console.error("❌ Error updating module:", err.message);
      alert("Error updating module. Please try again.");
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
