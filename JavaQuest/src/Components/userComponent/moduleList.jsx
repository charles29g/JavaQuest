import ModuleItem from "./moduleItem.jsx";

export default function ModuleList({ ModuleItems, setPage, setModuleID }) {
  return (
    <div className="container-fluid backgroundimg2 px-0">
      {ModuleItems.filter((item) => item.publish === true) // <-- only published items
        .sort((a, b) => a.id - b.id)
        .map((item) => (
          <ModuleItem
            key={item.id}
            id={item.id}
            name={item.moduleName}
            quiz={item.moduleQuiz}
            img={item.img_path}
            setPage={setPage}
            setModuleID={setModuleID}
          />
        ))}
    </div>
  );
}
