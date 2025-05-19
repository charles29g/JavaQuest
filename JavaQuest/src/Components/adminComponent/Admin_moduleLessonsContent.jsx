import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Trash2, Pencil } from "lucide-react";

import AddModuleContentModal from "../adminComponent/Create/Admin_AddModuleContentModal";

export default function Admin_ModuleLessonContents({
  _id,
  setModuleContents,
  id,
  name,
  description,
  imgpath,
  codeInit,
  moduleid,
}) {
  console.log("module ID(LessonContent): " + moduleid);
  const carouselId = `carousel-${id}`;
  const [code, setCode] = useState(codeInit); // new code field

  const [id2, setID] = useState(id); // ID is immutable
  const [name2, setname] = useState(name);
  const [description2, setdescription] = useState(description);
  const [hasRenderedCodeEditor, setHasRenderedCodeEditor] = useState();

  const [imgpath2, setimgpath] = useState(
    Array.isArray(imgpath) ? imgpath : [imgpath]
  );

  useEffect(() => {
    if (!hasRenderedCodeEditor && code && code.trim() !== "") {
      setHasRenderedCodeEditor(true);
    }
  }, [code, hasRenderedCodeEditor]);

  // ✅ Handle server update
  const handleUpdateContent = async (updatedContent) => {
    const confirmUpdate = await Swal.fire({
      title: "Are you sure?",
      text: "This will update the module content.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!confirmUpdate.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/modulecontents/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContent),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update module content");
      }

      console.log("✅ Module content updated:", result);

      // 🔁 Update local state
      setModuleContents((prevContents) =>
        prevContents.map((item) =>
          item._id === _id ? { ...item, ...result } : item
        )
      );

      await Swal.fire({
        title: "Updated!",
        text: "Module content updated successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error("❌ Error updating module content:", err.message);
      Swal.fire(
        "Error",
        "Failed to update module content. Please try again.",
        "error"
      );
    }
  };

  // ✅ Handle local save then server update
  const handleSave = () => {
    const updatedContent = {
      id: id2,
      sectionName: name2,
      sectionDescription: description2,
      sectionImage: imgpath2.filter((img) => img.trim() !== ""),
      code: code.trim(),
      publish: true,
    };

    setModuleContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id2 ? { ...content, ...updatedContent } : content
      )
    );

    handleUpdateContent(updatedContent); // 🔁 Call server update
  };

  const handleAddImage = () => {
    setimgpath([...imgpath2, ""]);
  };

  const handleImageChange = (index, value) => {
    const newPaths = [...imgpath2];
    newPaths[index] = value;
    setimgpath(newPaths);
  };

  const handleDeleteImage = (index) => {
    const newPaths = imgpath2.filter((_, i) => i !== index);
    setimgpath(newPaths);
  };

  const handleDeleteContent = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the module section.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/modulecontents/${_id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete module content");
      }

      // ✅ Remove section from local state
      setModuleContents((prevContents) =>
        prevContents.filter((content) => content._id !== _id)
      );

      await Swal.fire({
        title: "Deleted!",
        text: "Module section has been deleted.",
        icon: "success",
      });
    } catch (err) {
      console.error("❌ Error deleting module content:", err.message);
      Swal.fire(
        "Error",
        "Failed to delete module content. Please try again.",
        "error"
      );
    }
  };

  return (
    <section id={id2}>
      <div className="row align-items-center justify-content-center padding">
        <h3 className="descfont text-center">Edit Module Contents</h3>
        <div className="col-md-6 mb-4 mb-md-0">
          <label className="form-label">Section ID</label>
          <input
            type="number"
            value={id2}
            onChange={(e) => setID(e.target.value)}
            className="form-control mb-2"
          />
          <label className="form-label">Section Name</label>
          <input
            type="text"
            value={name2}
            onChange={(e) => setname(e.target.value)}
            className="form-control mb-2"
          />
          <label className="form-label">Section Description</label>
          <textarea
            rows={8}
            value={description2}
            onChange={(e) => setdescription(e.target.value)}
            className="form-control mb-4"
          />

          <div className="mb-3">
            <h5>Image Links</h5>
            {imgpath2.map((img, index) => (
              <div key={index} className="input-group mb-2">
                <input
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="form-control"
                />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                >
                  <Trash2 />
                </button>
              </div>
            ))}
            <button className="btn btn-sm btn-info mt-1" onClick={handleAddImage}>
              Add Image
            </button>
          </div>

          <div
            id={carouselId}
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {imgpath2.length === 0 ? (
                <div className="carousel-item active">
                  <p className="text-center">No images available</p>
                </div>
              ) : (
                imgpath2.map((src, i) => (
                  <div
                    key={i}
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                  >
                    <img src={src} className="img-fluid" alt={`Slide ${i}`} />
                  </div>
                ))
              )}
            </div>

            {imgpath2.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
          {(hasRenderedCodeEditor || (code && code.trim() !== "")) && (
            <>
              <label className="form-label">Module Compiler Java Code</label>
              <div className="code-editor-container">
                <textarea
                  rows={10}
                  className="code-editor"
                  placeholder="Enter Java code here..."
                  value={code}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setCode(newValue);
                    if (!hasRenderedCodeEditor && newValue.trim() !== "") {
                      setHasRenderedCodeEditor(true);
                    }
                  }}
                ></textarea>
              </div>
            </>
          )}

          <button
            className="btn btn-success mt-4 mb-4 w-25 mx-auto d-block"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn btn-danger mb-4 w-25 mx-auto d-block"
            onClick={handleDeleteContent}
          >
            Delete Section
          </button>
        </div>
      </div>
    </section>
  );
}
