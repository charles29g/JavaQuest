import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

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
        sessionStorage.setItem("token", data.token);

        const user = await fetchUserInfo(data.token);

        if (!user) {
          console.error("Could not fetch user info after login");
          return;
        }

        console.log("User info from /me:", user);

        if (user.role === "admin") {
          navigate("/Admin");
        } else {
          navigate("/User");
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
