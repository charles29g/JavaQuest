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
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-transparent text-white px-4">
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

          {/* <div className="row align-items-center justify-content-center"> */}
            {/* Right Column - Login Card */}
            <LoginForm></LoginForm>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
