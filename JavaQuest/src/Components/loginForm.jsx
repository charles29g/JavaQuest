import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import GoogleLoginButton from "./GoogleLoginButton";
export default function LoginForm() {
  return (
    <MDBContainer fluid style={{ height: "80vh" }}>
      <MDBRow className="h-100 align-items-center gap gx-7">
        {/* Intro Section (smaller width) */}
        <MDBCol md="5" className="text-center text-md-start mb-5 mb-md-0">
          <h1 className="titlefont text-white glow-text">JavaQuest</h1>
          <p className="text-white small">
            JavaQuest is an engaging and dynamic online platform designed to
            empower individuals in learning the fundamentals of Java
            programming. Whether you're a complete beginner or looking to
            strengthen your coding foundation, JavaQuest offers interactive
            lessons, hands-on challenges, and a fun, game-like experience that
            makes learning Java both effective and enjoyable.
          </p>
        </MDBCol>

        {/* Form Section */}
        <MDBCol md="4">
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: "#fff",
              maxWidth: "100%",
              minWidth: "280px",
            }}
          >
            <MDBInput
              wrapperClass="mb-3"
              label="Email address"
              id="formEmail"
              type="email"
              size="sm"
            />
            <MDBInput
              wrapperClass="mb-3"
              label="Password"
              id="formPassword"
              type="password"
              size="sm"
            />
            <div className="d-flex justify-content-between mb-3">
              <MDBCheckbox
                name="rememberMe"
                id="rememberMe"
                label="Remember me"
              />
              <a href="#!" className="small text-primary">
                Forgot password?
              </a>
            </div>
            <MDBBtn className="mb-3 w-100" size="sm">
              Sign in
            </MDBBtn>
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
            {/* Google Login Button Component */}
            <div className="d-flex justify-content-center mt-3 ">
              <GoogleLoginButton />
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
