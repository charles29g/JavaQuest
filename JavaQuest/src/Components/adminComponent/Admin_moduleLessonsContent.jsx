import { useState } from "react";

export default function Admin_ModuleLessonContents({
  _id,
  setModuleContents,
  id,
  name,
  description,
  imgpath,
}) {
  const carouselId = `carousel-${id}`;

  const [id2] = useState(id); // ID is immutable
  const [name2, setname] = useState(name);
  const [description2, setdescription] = useState(description);
  const [imgpath2, setimgpath] = useState(
    Array.isArray(imgpath) ? imgpath : [imgpath]
  );

  // ✅ Handle server update
  const handleUpdateContent = async (updatedContent) => {
    const confirmUpdate = window.confirm(
      "Are you sure you want to update this module content?"
    );
    if (!confirmUpdate) return;

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

      alert("Module content updated successfully!");
    } catch (err) {
      console.error("❌ Error updating module content:", err.message);
      alert("Error updating module content. Please try again.");
    }
  };

  // ✅ Handle local save then server update
  const handleSave = () => {
    const updatedContent = {
      id: id2,
      sectionName: name2,
      sectionDescription: description2,
      sectionImage: imgpath2.filter((img) => img.trim() !== ""),
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

  return (
    <section id={id2}>
      <div className="row align-items-center justify-content-center padding">
        <h3 className="descfont text-center">Edit Module Contents</h3>
        <div className="col-md-6 mb-4 mb-md-0">
          <label className="form-label">Section ID</label>
          <input
            type="number"
            value={id2}
            className="form-control mb-2"
            disabled
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
                  Delete
                </button>
              </div>
            ))}
            <button className="btn btn-success" onClick={handleAddImage}>
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

          <button
            className="btn btn-success mt-4 mb-4 w-25 mx-auto d-block"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
