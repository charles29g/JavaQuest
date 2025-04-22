import React, { useState, useEffect } from "react";
import ModuleNavbar from "./moduleNavbar.jsx";
import ModuleLessonContents from "./moduleLessonsContent";
import { useLayoutEffect } from "react";
import KCPage from "./kcPage.jsx";

export default function ModuleLessons({
  ModuleContents,
  moduleID,
  setPage,
  KCQA,
  selectedAnswers,
  setSelectedAnswers,
  KCCheckQA,
}) {
  const [activeSection, setActiveSection] = useState(null);
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section.id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const filteredContents = ModuleContents.filter(
    (item) => item.moduleid === moduleID
  );

  return (
    <>
      <div className="backgroundimg3">
        <div className="container-fluid pb-5">
          {filteredContents.length > 0 ? (
            <>
              <ModuleNavbar
                activeSection={activeSection}
                ModuleContents={filteredContents}
              />
              <div className="bg-light">
                {filteredContents.map((item) => (
                  <ModuleLessonContents
                    name={item.sectionName}
                    description={item.sectionDescription}
                    key={item.id}
                    id={item.id}
                    imgpath={item.sectionImage}
                  />
                ))}
              </div>
              <KCPage
                KCQA={KCQA}
                moduleID={moduleID}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                KCCheckQA={KCCheckQA}
              ></KCPage>
            </>
          ) : (
            <div className="alert nolesson alert-info text-center shadow-sm p-4 mx-auto d-flex justify-content-center align-items-center min-vh-75">
              <div className="row text-center   d-flex justify-content-center align-items-center ">
                <strong>No lessons available for this module.</strong>
                <button
                  className="gradient"
                  onClick={() => setPage("modulePage")}
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
