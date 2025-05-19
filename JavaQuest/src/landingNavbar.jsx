import React from "react";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="landpg-navbar navbar navbar-expand-lg text-white">
      <button
        className="navbar-toggler"
        id="landpg-navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse landpg-nav" id="navbarNav">
        <div className="navbar-nav landpg-navbar-nav d-flex flex-row gap-4">
          <a
            className="nav-link text-white"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </a>
          <a
            className="nav-link text-white"
            onClick={() => navigate("/AboutUS")}
            style={{ cursor: "pointer" }}
          >
            About Us
          </a>
          <a className="nav-link text-white" onClick={() => navigate("/")}>
            Resources
          </a>
          <a className="nav-link text-white" onClick={() => navigate("/")}>
            Updates
          </a>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
