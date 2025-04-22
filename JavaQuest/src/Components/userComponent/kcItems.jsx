export default function KCItems({ id, question, choices }) {
  return (
    <div className="container-fluid px-0 text-white mb-4">
  
      <h2>{question}</h2>

      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`q${id}-choice${index}`}
            name={`question-${id}`}
            value={choice}
          />
          <label htmlFor={`q${id}-choice${index}`}>{choice}</label>
        </div>
      ))}
    </div>
  );
}
