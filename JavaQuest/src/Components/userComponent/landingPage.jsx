import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Design.css';

export default function LandingPage() {
  const navigate = useNavigate();

  const [startTransition, setStartTransition] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handleStartClick = () => {
    setStartTransition(true);
    setTimeout(() => setStartAnimation(true), 100);
    setTimeout(() => navigate("/modules"), 3000);
  };
  const handleStartClick2 = () => {
    setStartTransition(true);
    setTimeout(() => setStartAnimation(true), 100);
    setTimeout(() => navigate("/Adminmodules"), 3000);
  };
  return (
    <div className={`transition-container ${startAnimation ? "animate" : ""}`}>
      <div className="backgroundimg">
        <div className="container">
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
              <div className="navbar-nav landpg-navbar-nav d-flex flex-row gap-4" >
                <a className="nav-link text-white" href="#">
                  About Us
                </a>
                <a className="nav-link text-white" href="#">
                  Resources
                </a>
                <a className="nav-link text-white" href="#">
                  Updates
                </a>
              </div>
            </div>
          </nav>

          <div className="landpg-row row align-items-center justify-content-center">
            <div className="col-md-6 mt-2 mb-md-0">
              <h1 className="titlefont text-white glow-text">JavaQuest</h1>
              <p className="text-white" id="intro">
                JavaQuest is an engaging and dynamic online platform designed to
                empower individuals in learning the fundamentals of Java
                programming. Whether you're a complete beginner or looking to
                strengthen your coding foundation, JavaQuest offers interactive
                lessons, hands-on challenges, and a fun, game-like experience
                that makes learning Java both effective and enjoyable.
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn gradient descfont fs-1 text-white p-0 glow-on-hover"
                  onClick={handleStartClick}
                  style={{
                    opacity: startTransition ? 0 : 1,
                    visibility: startTransition ? "hidden" : "visible",
                    pointerEvents: startTransition ? "none" : "auto",
                  }}
                >
                  <i className="fas fa-running me-3 p-0"></i>Start
                </button>
                {/* <button
                  className="btn gradient descfont fs-1 text-white p-0 glow-on-hover"
                  onClick={handleStartClick2}
                  style={{
                    opacity: startTransition ? 0 : 1,
                    visibility: startTransition ? "hidden" : "visible",
                    pointerEvents: startTransition ? "none" : "auto",
                  }}
                >
                  <i className="fas fa-running me-3 p-0"></i>Admin
                </button> */}
              </div>
            </div>

            <div className="col-6 col-m-6">
              <img
                src="/images/city.png"
                alt="City"
                className={`img-fluid mincity slow-bounce flying-car ${
                  startTransition ? "invisible" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {startTransition && (
        <>
          <div className="portal-wrapper">
            <img src="/images/portal.png" className="portal b-0 display d-block" alt="Portal" />
          </div>
          <img src="/images/Module/c1.png" className="car z-10" alt="Car" />
        </>
      )}
    </div>
  );
}
