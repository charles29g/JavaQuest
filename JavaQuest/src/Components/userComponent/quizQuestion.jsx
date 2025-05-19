export default function QuizQuestion({
  id,
  question,
  choices,
  onSelect,
  selected,
  isCorrect,
  isIncorrect,
  disabled, 
}) {
  const handleChange = (e) => {
    if (!disabled) {
      onSelect(id, e.target.value);
    }
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
      <h5 className="text-white fw-semibold">{id}. {question}</h5>
      {choices.map((choice, idx) => (
        <div key={idx} className="form-check">
          <input
            type="radio"
            name={`quiz-q-${id}`}
            id={`quiz-q-${id}-c${idx}`}
            value={choice}
            checked={selected === choice}
            onChange={handleChange}
            className="form-check-input"
            disabled={disabled} 
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
          That's not the right answer.
        </div>
      )}
      {isCorrect && (
        <div className="text-success mt-2 fw-bold">Correct!</div>
      )}
    </div>
  );
}
