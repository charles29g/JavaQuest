import React, { useImperativeHandle, useState, forwardRef } from "react";
import Swal from "sweetalert2";
const AddModuleContentModal = forwardRef(
  ({ moduleid, setModuleContents }, ref) => {
    const MID = Number(moduleid);

    const [sectionID, setSectionID] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [ModuleID, setModuleID] = useState(MID);
    const [sectionDescription, setSectionDescription] = useState("");
    const [sectionImage, setSectionImage] = useState([""]);
    const [code, setCode] = useState("");

    useImperativeHandle(ref, () => ({
      openModal() {
        const modal = new window.bootstrap.Modal(
          document.getElementById("addModuleContentModal")
        );
        modal.show();
      },
    }));

    async function handleSubmit(e) {
      e.preventDefault();

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this module content?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      });

      if (!result.isConfirmed) {
        return; // Stop if user cancelled
      }

      const data = {
        moduleid: ModuleID,
        id: sectionID,
        sectionName,
        sectionDescription,
        sectionImage,
        code,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/modulecontents",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Failed (status ${response.status}): ${errorBody}`);
        }

        const newContent = await response.json();
        setModuleContents((prev) => [...prev, newContent]);

        window.bootstrap.Modal.getInstance(
          document.getElementById("addModuleContentModal")
        ).hide();

        setSectionID("");
        setSectionName("");
        setSectionDescription("");
        setSectionImage([""]);
        setCode("");

        await Swal.fire({
          icon: "success",
          title: "Module content added successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error adding module content:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      }
    }

    function handleImageChange(index, value) {
      const updated = [...sectionImage];
      updated[index] = value;
      setSectionImage(updated);
    }

    const inputStyle = {
      borderRadius: "10px",
      padding: "0.75rem",
      color: "#fff",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
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
                    disabled
                    type="number"
                    className="form-control glass"
                    value={ModuleID}
                    onChange={(e) => setModuleID(Number(e.target.value))}
                    required
                    style={inputStyle}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.2rem" }}>
                    Section ID
                  </label>
                  <input
                    type="number"
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
                    <label
                      className="form-label"
                      style={{ fontSize: "1.2rem" }}
                    >
                      Section Image URL {i + 1}
                    </label>
                    <input
                      type="text"
                      className="form-control glass"
                      value={img}
                      onChange={(e) => handleImageChange(i, e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label" style={{ fontSize: "1.2rem" }}>
                    Code
                  </label>
                  <textarea
                    className="form-control glass"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{ ...inputStyle, minHeight: "80px" }}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100 mt-3">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

export default AddModuleContentModal;
