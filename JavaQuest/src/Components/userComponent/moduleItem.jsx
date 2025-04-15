export default function ModuleItem({  name, quiz, img }) {
  return (
    <div className="card p-5 m-5 corner gradient3 shadow-card">
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
            <button className="btn btn-light shadow-button btn-mod text-start w-100 w-md-75 fs-md-5">
              {name}
            </button>
          </div>
          <div className="d-flex justify-content-md-end justify-content-center py-2">
            <button className="btn btn-light shadow-button btn-mod text-start w-100 w-md-75 fs-md-5">
              {quiz}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
