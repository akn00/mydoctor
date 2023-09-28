import { useEffect, useState } from "react";
import SideBar from "../../SideBar/Index";
import { Button} from "@material-ui/core";
import QualificationBox from "../QualificationAdding"

const Index = () => {
  const userData = JSON.parse(localStorage.getItem("userInfo") || null);
  const [editable, setEditable] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [qualification, setQualification] = useState(
    userData?.user?.profile?.qualifications || []
  );
  const [newQualification, setNewQualification] = useState({
    name: "",
    institute: "",
    year: "",
  });

  useEffect(() => {
    for (let i = 0; i < qualification.length; i++) {
        if (qualification[i].name === "" || qualification[i].institute === "" || qualification[i].year === "") {
            setDisableSave(true);
            console.log("if value", true);
            break;
        } else {
            setDisableSave(false);
            console.log("else value", false);
        }
    }
}, [qualification, setDisableSave]);



  const handleAddQualification = () => {
      setQualification([...qualification, newQualification]);
      setNewQualification({ name: "", institute: "", year: "" });
  };

  function cancelEditing(){
    setQualification(userData?.user?.profile?.qualifications);
    setEditable(false);
  }
  function deleteBox(i){
    setQualification(qualification.filter((item, index)=>i!==index))
  }
  function handleSaveQualification(){
    setEditable(false);

  }

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ padding: "32px", width: "100%", minHeight: "73vh" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            style={{
              color: "#000000",
              fontSize: "25px",
              fontWeight: "bold",
              margin: 0,
              width: "100%",
            }}
          >
            My Qualifications
          </p>

          <div style={{display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px",}}>
            {!editable && (<Button style={{color: "white", backgroundColor: "#3f51b5", height: "40px",}} variant="contained" onClick={() => {setEditable(true);}}>
                EDIT
              </Button>
            )}
            {editable && (
              <Button style={{color: "white",backgroundColor: "#3f51b5",height: "40px",}} variant="contained" onClick={cancelEditing}>
                CANCEL
              </Button>
            )}
            {editable && (
              <Button style={{ color:disableSave?"black": "white", backgroundColor: disableSave?"": "#3f51b5", height: "40px", }} variant="contained" disabled={disableSave} onClick={handleSaveQualification} >
                SAVE
              </Button>
            )}
            {editable && (
              <Button style={{color: "white", backgroundColor: "#3f51b5", height: "40px", }} variant="contained" onClick={handleAddQualification}>
                ADD MORE
              </Button>
            )}
          </div>
        </div>

        {!editable && !qualification && (
          <div
            style={{
              color: "#696969",
              display: "flex",
              fontSize: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No Qualification added
          </div>
        )}

        <>
        {qualification.map((q,index)=>
        <QualificationBox key={index} name={q.name} institute={q.institute} year={q.year} newQual={newQualification} qualification={qualification} setNewQualification={setNewQualification} editable={editable} index={index} deleteBox={deleteBox}/>)}
        </>

        {qualification &&
          qualification.map((qual, index) => (
            <div key={index}>
              <p>Name: {qual.name}</p>
              <p>Institute: {qual.institute}</p>
              <p>Year: {qual.year}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Index;
