import React, { forwardRef, useImperativeHandle, useState } from "react";

const AddModuleContentModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openModal: () => {
      const modal = new window.bootstrap.Modal(
        document.getElementById("addModuleContentModal")
      );
      modal.show();
    },
  }));

  const [sectionID, setSectionID] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionImage, setSectionImage] = useState([""]);
  const [code, setCode] = useState("");
  const [moduleID, setModuleID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModuleContent, setModuleContents] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      moduleid: moduleID,

      id: sectionID,
      sectionName: sectionName,
      sectionDescription: sectionDescription,
      sectionImage: sectionImage,
      code: code,
    };

    console.log("Submitting data:", data);

    try {
      const response = await fetch("http://localhost:5000/api/modulecontents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);

      if (!response.ok) {
        // Try to parse response body for error message if available
        let errorBody;
        try {
          errorBody = await response.text();
          console.error("Response body:", errorBody);
        } catch (err) {
          console.error("Error reading error response body:", err);
        }
        throw new Error(
          `Failed to add module content (status ${response.status})`
        );
      }

      const newContent = await response.json();
      console.log("New module content added:", newContent);

      props.setModuleContents((prev) => [...prev, newContent]);

      window.bootstrap.Modal.getInstance(
        document.getElementById("addModuleContentModal")
      ).hide();

      // Reset form fields
      setSectionID("");
      setSectionName("");
      setSectionDescription("");
      setSectionImage([""]);
      setCode("");
    } catch (error) {
      console.error("Error adding module content:", error);
    }
  };

  const handleImageChange = (index, value) => {
    const updated = [...sectionImage];
    updated[index] = value;
    setSectionImage(updated);
  };

  return (
    <div
      className="modal fade mt-5"
      id="addModuleContentModal"
      tabIndex="-1"
      aria-labelledby="addModuleContentModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content glass corner">
          <form onSubmit={handleSubmit}>
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h2
                className="modal-title descfont text-center w-100"
                id="addModuleContentModalLabel"
                style={{ color: "#fff" }}
              >
                Add Module Content
              </h2>
              <button
                type="button"
                className="btn-close glow-on-hover"
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
                  type="text"
                  className="form-control glass"
                  value={moduleID}
                  onChange={(e) => setModuleID(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Section ID
                </label>
                <input
                  type="text"
                  className="form-control glass"
                  value={sectionID}
                  onChange={(e) => setSectionID(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Section Name
                </label>
                <input
                  type="text"
                  className="form-control glass"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Description
                </label>
                <textarea
                  className="form-control glass"
                  value={sectionDescription}
                  onChange={(e) => setSectionDescription(e.target.value)}
                  required
                  style={{ ...inputStyle, minHeight: "80px" }}
                />
              </div>
              {sectionImage.map((img, i) => (
                <div className="mb-3" key={i}>
                  <label className="form-label" style={{ fontSize: "1.2rem" }}>
                    Image Link #{i + 1}
                  </label>
                  <input
                    type="text"
                    className="form-control glass"
                    value={img}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: "1.2rem" }}>
                  Code Snippet
                </label>
                <textarea
                  className="form-control glass"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  style={{
                    ...inputStyle,
                    minHeight: "100px",
                    fontFamily: "monospace",
                  }}
                />
              </div>
            </div>
            <div
              className="modal-footer d-flex justify-content-center"
              style={{ borderTop: "none" }}
            >
              <button type="submit" className="btn btn-success glow-on-hover">
                Add Content
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Modal rendered conditionally */}
      {isModalOpen && (
        <AddModuleContentModal
          moduleID={moduleID}
          setModuleContents={setModuleContents}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
});

const inputStyle = {
  borderRadius: "10px",
  padding: "0.75rem",
  color: "#fff",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

export default AddModuleContentModal;
