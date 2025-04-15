import ModuleItem from "./moduleItem.jsx";

export default function ModuleList({ ModuleItems }) {
  return (
    <div className="container-fluid backgroundimg2 px-0">
      {ModuleItems.map((item) => (
        <ModuleItem
          key={item.id}
          name={item.moduleName}
          quiz={item.moduleQuiz}
          img={item.img_path}
        />
      ))}
    </div>
  );
}
