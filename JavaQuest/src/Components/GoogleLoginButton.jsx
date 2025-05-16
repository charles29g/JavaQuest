import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // fixed import
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded Google User:", decoded);

    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        const { user } = data;

        localStorage.setItem("token", data.token);

        // Debug before navigation
        console.log("Navigating to:", user.role === "admin" ? "/Admin" : "/");

        if (user.role === "admin") {
          navigate("/Admin");
        } else {
          navigate("/");
        }
      } else {
        console.error("Login failed", data.error);
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
      
    />
  );
};

export default GoogleLoginButton;
