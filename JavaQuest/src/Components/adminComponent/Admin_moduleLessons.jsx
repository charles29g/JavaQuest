import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Admin_ModuleNavbar from "./Admin_moduleNavbar.jsx";
import Admin_ModuleLessonContents from "./Admin_moduleLessonsContent.jsx";
import AddModuleContentModal from "../adminComponent/Create/Admin_AddModuleContentModal";
import { useLayoutEffect } from "react";
import Admin_KCPage from "./Admin_kcPage.jsx";

export default function Admin_ModuleLessons({
  ModuleContents,
  setModuleContents,
  moduleID,
  KCQA,
  selectedAnswers,
  setSelectedAnswers,
  KCCheckQA,
}) {
  const navigate = useNavigate();
  const addModuleModalRef = useRef();

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

  const filteredContents = [...ModuleContents]
    .filter((item) => item.moduleid === moduleID)
    .sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <>
      <div className="backgroundimg3">
        <div
          className="container-fluid d-flex justify-content-center pb-5"
          style={{ background: "transparent" }}
        >
          <button
            style={{ marginTop: "20vh" }}
            className="btn btn-info "
            onClick={() => addModuleModalRef.current.openModal()}
          >
            Add Another Section
          </button>
          <AddModuleContentModal
            setModuleContents={setModuleContents}
            ref={addModuleModalRef}
            setModuleItems={setModuleContents}
            moduleid={moduleID}
          />
        </div>

        {filteredContents.length > 0 ? (
          <>
            <Admin_ModuleNavbar
              activeSection={activeSection}
              ModuleContents={filteredContents}
            />
            <div className="bg-light">
              {filteredContents.map((item) => (
                <Admin_ModuleLessonContents
                  _id={item._id}
                  setModuleContents={setModuleContents}
                  name={item.sectionName}
                  description={item.sectionDescription}
                  key={item._id}
                  id={item.id}
                  imgpath={item.sectionImage}
                  codeInit={item.code}
                  moduleid={moduleID}
                />
              ))}
            </div>
            <Admin_KCPage
              KCQA={KCQA}
              moduleID={moduleID}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              KCCheckQA={KCCheckQA}
            ></Admin_KCPage>
          </>
        ) : (
          <div className="alert nolesson alert-info text-center shadow-sm p-4 mx-auto d-flex justify-content-center align-items-center min-vh-75">
            <div className="row text-center   d-flex justify-content-center align-items-center ">
              <strong>No lessons available for this module.</strong>
              <button
                className="gradient"
                onClick={() => navigate("/Adminmodules")}
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
