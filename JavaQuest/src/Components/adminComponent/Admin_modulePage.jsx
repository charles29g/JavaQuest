import Admin_ModuleList from "./Admin_moduleList.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import AddModuleModal from "./Create/Admin_AddModuleModal.jsx";
import { Plus, Undo2 } from "lucide-react";
export default function ModulePage({
  ModuleItems,
  setPage,
  setModuleID,
  setModuleItems,
}) {
  const navigate = useNavigate();
  const modalRef = useRef();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="backgroundimg2">
      <nav className="nav navbar d-flex justify-content-between align-items-center px-3">
        <button
          className="btn rounded-5 btn-info d-flex align-items-center justify-content-center text-white glow-on-hover descfont"
          style={{
            width: "120px",
            height: "50px",
            backgroundColor: "#033592",
            border: "none",
          }}
          onClick={() => goBack()}
          value="landingPage"
        >
          <Undo2 className="me-2" /> Back
        </button>
        <h6 className="titlefont2 text-white m-0 typing mx-auto">JavaQuest</h6>
        <div style={{ width: "42px" }}></div>
      </nav>

      <div className="container-fluid px-0 pt-2">
        <div className="row g-0 gradient2 overflow-hidden position-relative">
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
        <h3 className="text-white text-center descfont mt-4">Welcome Admin!</h3>
        <h2 className="text-white text-center descfont mt-4">Modules</h2>

        <div className="container mt-4 text-end">
          <button
            className="btn btn-success"
            onClick={() => modalRef.current.openModal()}
          >
            <Plus />
            Add Module
          </button>
        </div>
        {/* Include modal component and pass ref */}
        <AddModuleModal ref={modalRef} setModuleItems={setModuleItems} />

        <Admin_ModuleList
          setModuleItems={setModuleItems}
          ModuleItems={ModuleItems}
          setPage={setPage}
          setModuleID={setModuleID}
        />
      </div>
    </div>
  );
}
