
export default function ModuleLessonContents({
  id,
  name,
  description,
  imgpath,
}) {

  return (
    <section id={id}>
      <div className="row align-items-center justify-content-center padding">
        <div className="col-md-6 mb-4 mb-md-0">
          <h4>{name}</h4>
          <hr />
          <p>{description}</p>
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={imgpath} className="img-fluid" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/images/bg.png" className="img-fluid" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="/images/bg2.png" className="img-fluid" alt="..." />
              </div>
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
        </div>
      </div>
    </section>
  );
}
