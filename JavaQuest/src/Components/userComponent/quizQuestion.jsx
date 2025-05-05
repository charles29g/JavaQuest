export default function QuizQuestion({
  id,
  question,
  choices,
  onSelect,
  isCorrect,
  isIncorrect,
}) {
  const handleChange = (e) => {
    onSelect(id, e.target.value);
  };

  return (
    <div
      className={`mb-4 p-3 rounded ${
        isCorrect
          ? "bg-success bg-opacity-10 border border-success"
          : isIncorrect
          ? "bg-danger bg-opacity-10 border border-danger"
          : "bg-dark bg-opacity-10"
      }`}
    >
      <h5 className="text-white fw-semibold">{question}</h5>
      {choices.map((choice, idx) => (
        <div key={idx} className="form-check">
          <input
            type="radio"
            name={`quiz-q-${id}`}
            id={`quiz-q-${id}-c${idx}`}
            value={choice}
            onChange={handleChange}
            className="form-check-input"
          />
          <label
            htmlFor={`quiz-q-${id}-c${idx}`}
            className="form-check-label text-white"
          >
            {choice}
          </label>
        </div>
      ))}

      {isIncorrect && (
        <div className="text-danger mt-2 fw-bold">
          ❌ That's not the right answer.
        </div>
      )}
      {isCorrect && (
        <div className="text-success mt-2 fw-bold">✅ Correct!</div>
      )}
    </div>
  );
}
