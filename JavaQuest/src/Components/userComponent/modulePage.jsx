import ModuleList from "./moduleList.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

export default function ModulePage({
  ModuleItems,
  setPage,
  setModuleID,
  setUserID,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  console.log("User Fetch", user);

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
        setUserID(data.user._id);
      } catch (err) {
        console.error(err);

        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  const goBack = () => {
    navigate("/User");
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="backgroundimg2">
      <nav className="nav navbar d-flex justify-content-between align-items-center px-3">
        <button
          className="btn descfont text-white"
          onClick={() => goBack()}
          value="landingPage"
        >
          <ChevronLeft /> Go Back
        </button>
        <h6 className="titlefont2 text-white m-0 typing mx-auto">JavaQuest</h6>
        {/* User Tab */}
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
        {user ? (
          <>
            <h2 className="text-white text-center mt-4">Modules</h2>
            <ModuleList
              user={user}
              ModuleItems={ModuleItems}
              setPage={setPage}
              setModuleID={setModuleID}
            />
          </>
        ) : (
          <div className="text-white text-center mt-4">Loading modules...</div>
        )}
      </div>
    </div>
  );
}
