import { useEffect, useState } from "react";
export default function KCItems({
  id,
  question,
  choices,
  onAnswerSelected,
  isIncorrect,
  isCorrect,
}) {
  const handleAnswerChange = (e) => {
    onAnswerSelected(id, e.target.value);
  };

  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchUserInfo(token).then((userData) => {
        if (userData) {
          console.log("Fetched user:", userData);
          setUser(userData);
        }
      });
    }
  }, []);

  return (
    <div
      className={`container-fluid px-0 text-white mb-4 ${
        isIncorrect
          ? "border border-danger-subtle rounded-3 px-3 bg-danger bg-opacity-10 shadow-sm p-3 animate__animated animate__headShake"
          : isCorrect
          ? "border border-success rounded-3 px-3 bg-success bg-opacity-10 shadow-sm p-3 animate__animated animate__pulse"
          : "bg-dark bg-opacity-10 rounded-3 p-3"
      }`}
    >
      <h5 className="fw-semibold">{question}</h5>
      <div className="mb-2">
        {choices.map((choice, index) => (
          <div className="form-check" key={index}>
            <input
              type="radio"
              id={`q${id}-choice${index}`}
              name={`question-${id}`}
              value={choice}
              onChange={handleAnswerChange}
              className="form-check-input"
            />
            <label
              htmlFor={`q${id}-choice${index}`}
              className="form-check-label"
            >
              {choice}
            </label>
          </div>
        ))}
      </div>

      {isIncorrect && (
        <small className="text-danger d-block mt-2 fw-bold">
          🚩 Oops! That didn’t power up your car. Try again!
        </small>
      )}

      {/* Correct answer message */}
      {isCorrect && (
        <small className="text-success d-block mt-2 fw-bold">
          ✅ Well done! You’ve successfully powered up your car. Keep it going!
        </small>
      )}
    </div>
  );
}
