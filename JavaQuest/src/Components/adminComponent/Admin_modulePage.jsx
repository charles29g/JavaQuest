import Admin_ModuleList from "./Admin_moduleList.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        sessionStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  const goBack = () => {
    navigate("/Admin");
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
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
          onClick={goBack}
        >
          <Undo2 className="me-2" /> Back
        </button>
        <h6 className="titlefont2 text-white m-0 typing mx-auto">JavaQuest</h6>

        <div
          className="d-flex align-items-center text-white"
          style={{ minWidth: "150px", justifyContent: "flex-end" }}
        >
          {user ? (
            <>
              <span className="me-3">Hello, {user.name}</span>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <span>Loading...</span>
          )}
        </div>
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
            <Plus /> Add Module
          </button>
        </div>

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
