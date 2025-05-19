import Admin_ModuleNavItems from "./Admin_moduleItem.jsx";
import { useNavigate } from "react-router-dom";
import { Trash2, Pencil, ChevronLeft } from "lucide-react";


export default function Admin_ModuleNavbar({ activeSection, ModuleContents }) {
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
        <div className="row gap-5">
          <div className="d-flex flex-column flex-lg-row w-100 gap-5 justify-content-center align-items-center p-0 m-0">
            <div className="w-100 w-lg-auto text-center title d-flex flex-column justify-content-center align-items-center p-0 m-0">
              <button
                className="btn descfont text-white"
                onClick={() => navigate("/Adminmodules")}
                value="landingPage"
              >
                <ChevronLeft/> Go Back
              </button>
              Module 1: Introduction to Java & Syntax
            </div>

            {ModuleContents.map((items) => (
              <a
                key={items.id}
                href={"#" + items.id}
                className={`w-100 col-2 gradient4 w-lg-auto text-center  text-white shadow-lesson d-flex flex-column justify-content-center square-box ${
                  activeSection === `${items.id}` ? "active-navbar-item" : ""
                }`}
              >
                {items.sectionName} 1
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
