import KCList from "./kcList";
export default function KCPage({KCQA, moduleID,KCCheckQA }) {
    return (
      <>
        <div className="backgroundimg4  container-fluid">
          <div className="container-fluid px-5 m-0 pt-5">
           
            <KCList KCQA={KCQA} moduleID={moduleID} KCCheckQA={KCCheckQA}></KCList>
          </div>
        </div>
      </>
    );
  }
  