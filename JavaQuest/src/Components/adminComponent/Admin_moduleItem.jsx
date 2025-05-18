import { useNavigate } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import Swal from "sweetalert2";

export default function Admin_ModuleItem({
  _id,
  id, // custom ID (used for display)
  name, // moduleName
  quiz, // moduleQuiz
  img, // image path
  setModuleID, // state setter for selected module ID
  setModuleItems,
  publish,
  quizConfig,
}) {
  const navigate = useNavigate();

  console.log("Quiz Config : " + quizConfig);

  const handleDelete = async () => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/modules/${_id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete module");
      }

      Swal.fire("Deleted!", "The module has been deleted.", "success");

      if (setModuleItems) {
        setModuleItems((prevItems) =>
          prevItems.filter((item) => item._id !== _id)
        );
      }
    } catch (err) {
      console.error("❌ Error deleting module:", err.message);
      Swal.fire("Error", "Failed to delete module. Please try again.", "error");
    }
  };

  return (
    <div className="card p-5 m-5 corner gradient3 shadow-card">
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-danger rounded-5 d-flex align-items-center justify-content-center"
          style={{ width: "50px", height: "50px" }}
          onClick={handleDelete}
        >
          <Trash2 />
        </button>

        <button
          className="btn btn-primary d-flex rounded-5 align-items-center justify-content-center"
          style={{ width: "50px", height: "50px" }}
          onClick={() =>
            navigate("/Admin_UpdatemoduleItem", {
              state: {
                _id: _id,
                id: id,
                moduleName: name,
                moduleQuiz: quiz,
                img_path: img,
                publish: publish,
                quizConfig: quizConfig,
              },
            })
          }
        >
          <Pencil />
        </button>
      </div>

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
                navigate("/Adminlessons");
                setModuleID(id);
              }}
            >
              {name} {id}
            </button>
          </div>
          <div className="d-flex justify-content-md-end justify-content-center py-2">
            <button
              className="btn btn-light shadow-button btn-mod text-start w-100 w-md-75 fs-md-5"
              onClick={() => {
                navigate("/AdminquizInstructions");
                setModuleID(id);
              }}
            >
              {quiz} {id}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
