import React from "react";
import "./Design.css";
import LandingNavbar from "./landingNavbar";

function getTeam() {
  return [
    {
      name: "Aaron Joshua Bagain",
      role: "Developer",
      image: "/images/AJ.jpg",
    },
    {
      name: "Hans Dionysius Neziah M. Delos Reyes",
      role: "Developer",
      image: "/images/Hanss.jpg",
    },
    {
      name: "Sophia Mikhaela A. Fabian",
      role: "Developer",
      image: "/images/Sophia.JPG",
    },
    {
      name: "Charles Joseph A. Gutierrez",
      role: "Head Developer",
      image: "/images/Charles.jpg",
    },
  ];
}

function AboutUs() {
  const team = getTeam();
  
  return (
    <div className="team-section container py-5">
      <LandingNavbar />

      <h2 className="text-center team-heading mb-3">
        Meet the <em>visionaries</em> powering JavaQuest — where learning Java
        transforms into <em>conquering code</em>
      </h2>
      <p className="text-center team-subtext mb-5">
        We’re on a mission to break barriers, turning beginners into{" "}
        <em>confident coders</em> with an <em>electrifying platform</em> that
        makes mastering Java’s fundamentals <em>fast, fun, and unstoppable</em>
      </p>

      <div className="row justify-content-center">
        {team.map(function (member, idx) {
          return (
            <div className="col-md-4 text-center mb-4" key={idx}>
              <div className="team-card">
                <img
                  src={member.image}
                  className="img-fluid rounded-circle mb-3 team-img"
                  alt={member.name}
                />
                <h5 className="team-name">{member.name}</h5>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutUs;
