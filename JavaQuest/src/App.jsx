import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./Design.css";

import LandingPage from "./Components/userComponent/landingPage";
import ModulePage from "./Components/userComponent/modulePage";
import ModuleLessons from "./Components/userComponent/moduleLessons";
import QuizPageInstructions from "./Components/userComponent/quizPageInstructions";
import Quiz from "./Components/userComponent/quiz";

import { ModuleItems, ModuleContents, KCQA, Q1 } from "./Components/data.js";

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
        {/* Quiz Section */}
        <Route
          path="/quizInstructions"
          element={
            <QuizPageInstructions
              moduleID={moduleID}
              ModuleItems={ModuleItems}
            />
          }
        />
        <Route path="/quiz" element={<Quiz moduleID={moduleID} />} />
        {/* Page not found */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
