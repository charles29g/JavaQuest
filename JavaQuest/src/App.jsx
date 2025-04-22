import { useState } from "react";
import "./Design.css";
import LandingPage from "./Components/userComponent/landingPage";
import ModulePage from "./Components/userComponent/modulePage";
import ModuleLessons from "./Components/userComponent/moduleLessons.jsx";

import { ModuleItems, ModuleContents, KCQA } from "./Components/data.js";

export default function App() {
  const [page, setPage] = useState("landingPage");
  const [moduleID, setModuleID] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers

  function KCCheckQA() {
    let score = 0;
    
    KCQA.forEach((item) => {
      if (selectedAnswers[item.id] === item.answer) {
        score += 1;
      }
    });

    alert(`Your score is: ${score} out of ${KCQA.length}`);
  }

  const renderPage = () => {
    switch (page) {
      case "landingPage":
        return <LandingPage setPage={setPage} />;
      case "modulePage":
        return <ModulePage ModuleItems={ModuleItems} setPage={setPage} setModuleID={setModuleID} />;
      case "moduleLessons":
        return (
          <ModuleLessons
            ModuleContents={ModuleContents}
            moduleID={moduleID}
            setPage={setPage}
            KCQA={KCQA}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
            KCCheckQA={KCCheckQA} 
          />
        );
      default:
        return <h2>Page Not Found</h2>;
    }
  };

  return <div>{renderPage()}</div>;
}
