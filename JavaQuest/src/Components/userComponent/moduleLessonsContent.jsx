import JDoodleAPICompiler from "../JDoodleCompiler.jsx";
import { useState, useEffect } from "react";

export default function ModuleLessonContents({
  id,
  name,
  description,
  imgpath,
  codeInit,
}) {
  const [hasRenderedCodeEditor, setHasRenderedCodeEditor] = useState();

  useEffect(() => {
    if (!hasRenderedCodeEditor && codeInit && codeInit.trim() !== "") {
      setHasRenderedCodeEditor(true);
    }
  }, [codeInit, hasRenderedCodeEditor]);
  return (
    <section id={id}>
      <div className="row align-items-center justify-content-center padding">
        <div className="col-md-6 mb-4 mb-md-0">
          <h4>{name}</h4>
          <hr />
          <p>{description}</p>

          {imgpath.filter((img) => img && img.trim() !== "").length > 0 && (
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {imgpath
                  .filter((img) => img && img.trim() !== "")
                  .map((img, index) => (
                    <div
                      key={index}
                      className={`carousel-item${index === 0 ? " active" : ""}`}
                    >
                      <img
                        src={img}
                        className="img-fluid"
                        alt={`Slide ${index + 1}`}
                      />
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
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
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )}
          {(hasRenderedCodeEditor || (codeInit && codeInit.trim() !== "")) && (
            <JDoodleAPICompiler codeInit={codeInit}></JDoodleAPICompiler>
          )}
        </div>
      </div>
    </section>
  );
}
