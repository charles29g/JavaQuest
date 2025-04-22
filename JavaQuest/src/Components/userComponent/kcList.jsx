import KCItems from "./kcItems";
export default function KCList({ KCQA, moduleID, KCCheckQA }) {
  const module1Questions = KCQA.filter((item) => item.moduleid === moduleID);

  return (
    <div className="container d-flex flex-column align-items-center px-0">
      <div
        className="w-100"
        style={{ maxWidth: "800px", textAlign: "justify" }}
      >
        <h3 className="text-white text-center">Knowledge Checkpoint</h3>

        <hr className="text-white w-50 mx-auto d-block" />

        <div className="d-flex justify-content-center">
          <p className="text-white text-center w-100 w-md-50 mx-auto px-3 text-break">
            Now that you’ve journeyed through the lesson, it’s time to take a
            quick breather and check how much you've absorbed. This fun
            checkpoint is here to reinforce what you’ve learned, highlight key
            concepts, and give you a clearer picture of your understanding
            before you level up. Think of each correct answer as a power-up —
            the more you get right, the more energy you will get to recharge
            your batteries for the road ahead. Give it your best shot!
          </p>
        </div>

        {module1Questions.map((item) => (
          <KCItems
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            choices={item.choices}
            on
          />
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="gradient">Submit</button>
      </div>
    </div>
  );
}
