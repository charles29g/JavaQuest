export default function Admin_QuizQuestion({
  id,
  question,
  choices,
  onSelect,
  selected,
  isCorrect,
  isIncorrect,
  disabled,
  onDelete,
  onEdit,
}) {
  const handleChange = (e) => {
    if (!disabled) {
      onSelect(id, e.target.value);
    }
  };

  return (
    <div className={`mb-4 p-3 rounded ${
      isCorrect
        ? "bg-success bg-opacity-10 border border-success"
        : isIncorrect
        ? "bg-danger bg-opacity-10 border border-danger"
        : "bg-dark bg-opacity-10"
    }`}>
      <div className="d-flex justify-content-between">
        <h5 className="text-white fw-semibold">{question}</h5>
        <div>
          <button className="btn btn-sm btn-warning me-2" onClick={onEdit}>✏️</button>
          <button className="btn btn-sm btn-danger" onClick={onDelete}>🗑️</button>
        </div>
      </div>

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
          <label htmlFor={`quiz-q-${id}-c${idx}`} className="form-check-label text-white">
            {choice}
          </label>
        </div>
      ))}

      {isIncorrect && <div className="text-danger mt-2 fw-bold">❌ That's not the right answer.</div>}
      {isCorrect && <div className="text-success mt-2 fw-bold">✅ Correct!</div>}
    </div>
  );
}
