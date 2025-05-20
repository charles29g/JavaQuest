import ModuleNavItems from "./moduleItem.jsx";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function ModuleNavbar({ activeSection, ModuleContents }) {
  const navigate = useNavigate();

  return (
    <nav className="nav-color sticky-navbar bg-transparent text-white navbar navbar-expand-lg p-0 m-0">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="nav-content row gap-5">
          <div className="d-flex flex-column flex-lg-row width-100 gap-5 justify-content-center align-items-center p-0 m-0">
            <div className=" w-lg-auto text-center title d-flex flex-column justify-content-center align-items-center p-0 m-0">
              <button
                className="btn descfont text-white"
                onClick={() => navigate("/modules")}
                value="landingPage"
              >
                <ChevronLeft /> Go Back
              </button>
            </div>

            {ModuleContents.map((items) => (
              <a
                key={items.id}
                href={"#" + items.id}
                className={`w-100 col-2 gradient4 w-lg-auto text-center  text-white shadow-lesson d-flex flex-column justify-content-center square-box ${
                  activeSection === `${items.id}` ? "active-navbar-item" : ""
                }`}
              >
                {items.sectionName}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
