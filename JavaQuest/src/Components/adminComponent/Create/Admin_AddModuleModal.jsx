import React, { forwardRef, useImperativeHandle, useState } from "react";

const AddModuleModal = forwardRef((props, ref) => {
  // Use Imperative Handle to control modal visibility
  useImperativeHandle(ref, () => ({
    openModal: () => {
      const modal = new window.bootstrap.Modal(
        document.getElementById("addModuleModal")
      );
      modal.show();
    },
  }));

  // State for handling form inputs
  const [moduleName, setModuleName] = useState("");
  const [moduleQuizName, setModuleQuizName] = useState("");
  const [moduleImageLink, setModuleImageLink] = useState("");
  const [moduleID, setModuleID] = useState(0); // Ensure moduleID is initialized as an empty string

  // Handle form submission for adding new module
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gather the data to send to the backend
    const data = {
      id: moduleID,
      moduleName: moduleName,
      moduleQuiz: moduleQuizName,
      img_path: moduleImageLink,
    };

    try {
      // Send a POST request to create a new module
      const response = await fetch("http://localhost:5000/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add new module");
      }

      const newModule = await response.json();
      console.log("New module added:", newModule);

      // Update the parent state to include the new module
      props.setModuleItems((prevModules) => [...prevModules, newModule]);

      // Hide the modal after successful addition
      window.bootstrap.Modal.getInstance(
        document.getElementById("addModuleModal")
      ).hide();

      // Reset the form
      setModuleName("");
      setModuleQuizName("");
      setModuleImageLink("");
      setModuleID(""); // Reset moduleID as well
    } catch (error) {
      console.error("Error adding new module:", error);
    }
  };

  return (
    <div
      className="modal fade mt-5"
      id="addModuleModal"
      tabIndex="-1"
      aria-labelledby="addModuleModalLabel"
      aria-hidden="true"
      
    >
      <div className="modal-dialog">
        <div className="modal-content glass corner">
          <form onSubmit={handleSubmit}>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h2
                className="modal-title descfont text-center w-100"
                id="addModuleModalLabel"
                style={{ color: "#fff" }}
              >
                Add Module
              </h2>
              <button
                type="button"
                className="btn-close  glow-on-hover"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body descfont" style={{ color: "#fff" }}>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Module ID
                </label>
                <input
                  name="moduleID"
                  type="text"
                  className="form-control glass"
                  value={moduleID}
                  onChange={(e) => setModuleID(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    padding: "0.75rem",
                    color: "#fff",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Module Name
                </label>
                <input
                  name="moduleName"
                  type="text"
                  className="form-control glass"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    padding: "0.75rem",
                    color: "#fff",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Module Quiz Name
                </label>
                <input
                  name="moduleQuizName"
                  type="text"
                  className="form-control glass"
                  value={moduleQuizName}
                  onChange={(e) => setModuleQuizName(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    padding: "0.75rem",
                    color: "#fff",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Module Image Link
                </label>
                <input
                  name="moduleImageLink"
                  type="text"
                  className="form-control glass"
                  value={moduleImageLink}
                  onChange={(e) => setModuleImageLink(e.target.value)}
                  required
                  style={{
                    borderRadius: "10px",
                    padding: "0.75rem",
                    color: "#fff",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>
            </div>
            <div
              className="modal-footer d-flex justify-content-center"
              style={{ borderTop: "none" }}
            >
              <button type="submit" className="btn btn-success glow-on-hover">
                Add Module
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default AddModuleModal;
