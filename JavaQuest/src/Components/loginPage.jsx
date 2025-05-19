import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./loginForm";
export default function LandingPage({ GoogleLoginButton }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    alert("Login");
  }

  return (
    <div className="transition-container">
      <div className="backgroundimg">
        <div className="container container-login">
          <nav className="login-navbar navbar navbar-expand-lg bg-transparent text-white">
            <button
              className="navbar-toggler"
              id="login-navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse login-nav" id="navbarNav">
              <div className="navbar-nav login-navbar-nav d-flex flex-row gap-4">
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
                <a
                  className="nav-link text-white"
                  onClick={() => navigate("/Resources")}
                >
                  Resources
                </a>
                <a
                  className="nav-link text-white"
                  onClick={() => navigate("/Updates")}
                >
                  Updates
                </a>
              </div>
            </div>
          </nav>

          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
}
