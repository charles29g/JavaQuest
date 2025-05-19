import ModuleItem from "./moduleItem.jsx";

export default function ModuleList({
  user,
  ModuleItems,
  setPage,
  setModuleID,
  UserID,
}) {
  return (
    <div className="container-fluid backgroundimg2 px-0">
      {ModuleItems.filter((item) => item.publish === true)
        .sort((a, b) => a.id - b.id)
        .map((item) => (
          <ModuleItem
            user={user}
            UserID={UserID}
            key={item.id}
            id={item.id}
            name={item.moduleName}
            quiz={item.moduleQuiz}
            img={item.img_path}
            setPage={setPage}
            setModuleID={setModuleID}
            quizConfig={item.quizConfig}
          />
        ))}
    </div>
  );
}
