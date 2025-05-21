import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const toggleSignup = () => setIsSignup(!isSignup);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setMessage("✅ Login successful!");
      sessionStorage.setItem("token", data.token);

      navigate("/modules");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to send OTP");

        alert("✅ OTP sent to your email");
        setOtpSent(true);
      } catch (err) {
        alert("❌ " + err.message);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
              otp,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Signup failed");
        }

        alert("✅ Registration successful! You can now log in.");
        setIsSignup(false);
        setOtpSent(false);
        setOtp("");
      } catch (error) {
        alert(error.message);
        console.error("Signup error:", error);
      }
    }
  };

  const handleForgotPasswordRequest = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      alert("✅ OTP sent to your email");
      setResetStep(2);
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: resetOtp,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");

      alert("✅ Password reset successfully! You can now log in.");
      setIsForgotPassword(false);
      setResetStep(1);
      setFormData({ ...formData, password: "", confirmPassword: "" });
      setResetOtp("");
      setNewPassword("");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <div style={{ minHeight: "80vh" }} className="d-flex align-items-center">
      <div className="container">
        <div className="row gx-7 align-items-center">
          <div className="form-col col-md-5 text-md-start mt-2 mb-md-0">
            <h1 className="titlefont text-white glow-text">JavaQuest</h1>
            <p className="text-white">
              JavaQuest is an engaging online platform designed to help
              individuals learn the basics of Java programming in a fun and
              interactive way...
            </p>
          </div>

          <div className="form-col col-md-4 offset-md-3">
            <div
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                maxWidth: "100%",
                minWidth: "280px",
                color: "black",
              }}
              className={isSignup ? "signup-mode" : ""}
            >
              {message && (
                <div className="alert alert-info text-center mb-3" role="alert">
                  {message}
                </div>
              )}
              {!isSignup && !isForgotPassword ? (
                <>
                  <h2 className="mb-4">Login</h2>
                  <form onSubmit={handleLoginSubmit}>
                    <label className="form-label w-100 mb-2">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="form-label w-100 mb-2">
                      <span>Password</span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          className="form-check-input me-2"
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        className="btn btn-link p-0 small"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setResetStep(1);
                        }}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                    >
                      Sign in
                    </button>
                    <p className="text-center fw-bold my-3">OR</p>
                    <div className="d-flex justify-content-center mb-3">
                      <GoogleLoginButton />
                    </div>
                    <p className="text-center">
                      New here?{" "}
                      <button
                        type="button"
                        onClick={toggleSignup}
                        className="btn btn-link p-0"
                      >
                        Create an account
                      </button>
                    </p>
                  </form>
                </>
              ) : isForgotPassword ? (
                <div>
                  <h2 className="mb-4">Reset Password</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (resetStep === 1) {
                        handleForgotPasswordRequest();
                      } else {
                        handleResetPassword();
                      }
                    }}
                  >
                    <label className="form-label w-100 mb-2">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    {resetStep === 2 && (
                      <>
                        <label className="form-label w-100 mb-2">
                          <span>OTP</span>
                          <input
                            type="text"
                            name="otp"
                            className="form-control"
                            value={resetOtp}
                            onChange={(e) => setResetOtp(e.target.value)}
                            required
                          />
                        </label>

                        <label className="form-label w-100 mb-2">
                          <span>New Password</span>
                          <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </label>
                      </>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                    >
                      {resetStep === 1 ? "Send OTP" : "Reset Password"}
                    </button>

                    <p className="text-center">
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(false)}
                        className="btn btn-link p-0"
                      >
                        Back to Login
                      </button>
                    </p>
                  </form>
                </div>
              ) : (
                <>
                  <h2 className="mb-4">Create New Account</h2>
                  <form onSubmit={handleSignupSubmit}>
                    <label className="form-label w-100 mb-2">
                      <span>Name</span>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="form-label w-100 mb-2">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="form-label w-100 mb-2">
                      <span>Password</span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label className="form-label w-100 mb-2">
                      <span>Confirm Password</span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    {otpSent && (
                      <label className="form-label w-100 mb-2">
                        <span>Enter OTP</span>
                        <input
                          type="text"
                          name="otp"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </label>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                    >
                      Create Account
                    </button>
                    <p className="text-center">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={toggleSignup}
                        className="btn btn-link p-0"
                      >
                        Login here
                      </button>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
