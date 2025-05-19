import ModuleList from "./moduleList.jsx";
import { useNavigate } from "react-router-dom";

export default function ModulePage({ ModuleItems, setPage, setModuleID }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="backgroundimg2">
      <nav className="nav navbar d-flex justify-content-between align-items-center px-3">
        <button className="btn" onClick={() => goBack()} value="landingPage">
          <i className="fa fa-arrow-left text-white"> Go Back</i>
        </button>
        <h6 className="titlefont2 text-white m-0 typing mx-auto">JavaQuest</h6>
        <div style={{ width: "42px" }}></div>
      </nav>

      <div className="container-fluid px-0 pt-2">
        <div className="row-container row g-0 gradient2 overflow-hidden position-relative">
          <div className="col-4 ">
            <img
              src="/images/Module/c1.png"
              className="w-100 h-100 object-fit-contain animate__animated slow-bounce flying-car animate__infinite"
              alt="c1"
            />
          </div>
          <div className="col-4 ">
            <img
              src="/images/Module/pc.png"
              className="img-fluid w-100 h-100 object-fit-cover"
              alt="pc"
            />
          </div>

          <div className="col-4 ">
            <img
              src="/images/Module/c2.png"
              className="w-100 h-100 object-fit-contain animate__animated animate__infinite flying-car"
              alt="c2"
            />
          </div>
        </div>
        <h2 className="text-white text-center mt-4">Modules</h2>

        <ModuleList
          ModuleItems={ModuleItems}
          setPage={setPage}
          setModuleID={setModuleID}
        />
      </div>
    </div>
  );
}
