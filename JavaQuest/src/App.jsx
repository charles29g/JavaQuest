import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Design.css";
import LandingPage from "./Components/userComponent/landingPage";
import Admin_LandingPage from "./Components/adminComponent/Admin_landingPage.jsx";
import ModulePage from "./Components/userComponent/modulePage";
import LoginPage from "./Components/loginPage.jsx";

import ModuleLessons from "./Components/userComponent/moduleLessons";
import QuizPageInstructions from "./Components/userComponent/quizPageInstructions";
import Quiz from "./Components/userComponent/quiz";

import { KCQA, Q1 } from "./Components/data.js";

import Admin_ModulePage from "./Components/adminComponent/Admin_modulePage";
import Admin_ModuleLessons from "./Components/adminComponent/Admin_moduleLessons";
import Admin_QuizPageInstructions from "./Components/adminComponent/Admin_quizPageInstructions";
import Admin_Quiz from "./Components/adminComponent/Admin_quiz";
import Admin_UpdatemoduleItem from "./Components/adminComponent/Update/Admin_UpdatemoduleItem";
import GoogleLoginButton from "./Components/GoogleLoginButton.jsx";
import AboutUs from "./aboutus.jsx";
export default function App() {
  const [ModuleItems, setModuleItems] = useState([]);
  const [ModuleContents, setModuleContents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/modules")
      .then((res) => res.json())
      .then((data) => setModuleItems(data))
      .catch((err) => console.error(err));
    console.log("Module Item:" + ModuleItems);
  }, []);
  console.log(ModuleItems);
  useEffect(() => {
    fetch("http://localhost:5000/api/modulecontents")
      .then((res) => res.json())
      .then((data) => setModuleContents(data))
      .catch((err) => console.error(err));
    console.log("Module Item:" + ModuleContents);
  }, []);
  console.log(ModuleContents);

  const [moduleID, setModuleID] = useState(1);
  const [userID, setUserID] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/Login"
          element={<LoginPage GoogleLoginButton={GoogleLoginButton} />}
        />

        <Route
          path="/"
          element={<LandingPage GoogleLoginButton={GoogleLoginButton}  />}
        />
        <Route
        path="/AboutUS"
        element={<AboutUs/>}
       />
        <Route
          path="/Admin"
          element={<Admin_LandingPage GoogleLoginButton={GoogleLoginButton} />}
        />

        <Route
          path="/Admin_UpdatemoduleItem"
          element={<Admin_UpdatemoduleItem setModuleItems={setModuleItems} />}
        />

        <Route
          path="/modules"
          element={
            <ModulePage
              ModuleItems={ModuleItems}
              setUserID={setUserID}
              setModuleID={setModuleID}
            />
          }
        />
        <Route
          path="/Adminmodules"
          element={
            <Admin_ModulePage
              ModuleItems={ModuleItems}
              setModuleItems={setModuleItems}
              setModuleID={setModuleID}
            />
          }
        />
        <Route
          path="/lessons"
          element={
            <ModuleLessons
              userID={userID}
              setUserID={setUserID}
              ModuleContents={ModuleContents}
              moduleID={moduleID}
              KCQA={KCQA}
            />
          }
        />
        <Route
          path="/Adminlessons"
          element={
            <Admin_ModuleLessons
              setModuleContents={setModuleContents}
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
        <Route
          path="/AdminquizInstructions"
          element={
            <Admin_QuizPageInstructions
              moduleID={moduleID}
              ModuleItems={ModuleItems}
            />
          }
        />
        <Route path="/quiz" element={<Quiz moduleID={moduleID} />} />
        <Route path="/Adminquiz" element={<Admin_Quiz moduleID={moduleID} />} />

        {/* Page not found */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
