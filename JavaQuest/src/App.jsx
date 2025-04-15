import { useState } from "react";

import "./Design.css";
import LandingPage from "./Components/userComponent/landingPage";
import ModulePage from "./Components/userComponent/modulePage";
import ModuleItems from "./Components/data.js";

export default function App() {
  const [page, setPage] = useState("landingPage");

  const renderPage = () => {
    switch (page) {
      case "landingPage":
        return <LandingPage setPage={setPage} />;
      case "modulePage":
        return <ModulePage ModuleItems={ModuleItems} setPage={setPage} />;
      default:
        return <h2>Page Not Found</h2>;
    }
  };

  return <div>{renderPage()}</div>;
}
