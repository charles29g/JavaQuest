import React, { useEffect, useState } from "react";

export default function Transition({ onComplete }) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setStartAnimation(true), 100);

    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`transition-container ${startAnimation ? "animate" : ""}`}>
      <div className="backgroundimg">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-transparent text-white px-4">
            <div className="collapse navbar-collapse show">
              <div className="navbar-nav d-flex flex-row gap-4">
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

          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="transition-title">
                <h1 className="titlefont text-white glow-text">JavaQuest</h1>
                <p className="text-white mt-2">
                  JavaQuest is an engaging online platform designed to help
                  individuals learn the basics of <br /> Java programming in a
                  fun and interactive way...
                </p>
              </div>
            </div>
            <div className="col-6 col-m-6"></div>
          </div>
        </div>
      </div>

      <div className="portal-wrapper">
        <img src="/images/portal.png" className="portal" alt="Portal" />
      </div>
      <img src="/images/Module/c1.png" className="car z-10" alt="Car" />
    </div>
  );
}
