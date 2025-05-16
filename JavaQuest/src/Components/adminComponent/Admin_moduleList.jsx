import Admin_ModuleItem from "./Admin_moduleItem.jsx";

export default function Admin_ModuleList({
  ModuleItems,
  setPage,
  setModuleID,
  setModuleItems
}) {




  return (
    <div className="container-fluid backgroundimg2 px-0">
      {ModuleItems.sort((a, b) => a.id - b.id).map((item) => (
        <Admin_ModuleItem
          _id={item._id}
          key={item.id}
          id={item.id}
          name={item.moduleName}
          quiz={item.moduleQuiz}
          img={item.img_path}
          setPage={setPage}
          setModuleID={setModuleID}
          setModuleItems={setModuleItems}
          publish={item.publish}
          
        />

    
    
    
      )
    
    )
      
      
      }
    </div>
  );
}
