import React from "react";
import "./Design.css";
import LandingNavbar from "./landingNavbar";


function Update() {
  return (
    <div>
        <div className="navbar text-white" style={{ paddingLeft: '2.5rem', 
            paddingTop: '0px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 10, }}>
            <LandingNavbar/>
        </div>
    <div className="update-section">
      <div className="update-content">
        <h1 className="update-title">
          <em>Stay Ahead.</em> Stay <span className="highlight">Updated.</span>
        </h1>
        <p className="update-description">
          Make the most out of your Java learning journey by staying up to date
          with the <em>latest features</em>, <em>security improvements</em>, and
          <em> performance upgrades</em> from the official Java platform.
        </p>

        <div className="update-box">
          <h2 className="box-title">Java Official Site</h2>
          <p className="box-text">
            Get the newest updates, releases, and resources straight from
            Oracle. Don’t miss out on critical updates that keep your Java apps
            safe and powerful.
          </p>
          <a
            href="https://www.java.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="update-button"
          >
            Visit Java.com →
          </a>
        </div>
      </div>
    </div>
    </div>

  );
}

export default Update;
