import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./Design.css";

import LandingPage from "./Components/userComponent/landingPage";
import ModulePage from "./Components/userComponent/modulePage";
import ModuleLessons from "./Components/userComponent/moduleLessons.jsx";
import QuizPageInstructions from "./Components/userComponent/quizPageInstructions.jsx";

import { ModuleItems, ModuleContents, KCQA } from "./Components/data.js";

export default function App() {
  const [moduleID, setModuleID] = useState(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/modules"
          element={
            <ModulePage ModuleItems={ModuleItems} setModuleID={setModuleID} />
          }
        />
        <Route
          path="/lessons"
          element={
            <ModuleLessons
              ModuleContents={ModuleContents}
              moduleID={moduleID}
              KCQA={KCQA}
            />
          }
        />
        <Route
          path="/quiz"
          element={
            <QuizPageInstructions
              moduleID={moduleID}
              ModuleItems={ModuleItems}
            />
          }
        />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
