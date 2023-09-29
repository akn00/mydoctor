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
    if (qualification[i].name === "" || qualification[i].institute === "" || qualification[i].year === "" || qualification[i].name.length<3 || qualification[i].institute.length<3 || qualification[i].year.length<4) {
      setDisableSave(true);
      break;
    } else {
      setDisableSave(false);
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
  const data={
       profile: {
        qualifications: qualification,
       },
      };;
  uploadDoctorData(JSON.stringify(data))
 }

 async function uploadDoctorData(data) {
  try {
      
      let response = await fetch(
          `http://my-doctors.net:8090/doctors/${userData.user._id}`,
          {
              method: "PATCH",
              headers: {
                  Authorization: `Bearer ${userData.accessToken}`,
                  "content-type":"application/json"
              },
              body: data,
          }
      );
      response = await response.json();
      // console.log(response);
      let newData = {
        ...userData,
        user: response
      };
      response?._id&& localStorage.setItem("userInfo",JSON.stringify(newData))
      setQualification(response?.profile?.qualifications);
      console.log(newData);
      
  } catch (error) {
      console.error("Error:", error);
      throw error;
  }
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
    {qualification?.map((q,index)=>
      <QualificationBox
              key={index}
              name={q.name}
              institute={q.institute}
              year={q.year}
              newQual={newQualification}
              qualification={qualification}
              setNewQualification={setNewQualification}
              editable={editable}
              index={index}
              deleteBox={deleteBox}
              setQualification={setQualification} // Pass the setQualification function
            />
          )}   
      </>
      <div style={{display:"flex", width:"100%",justifyContent:"flex-end", alignItems:"self-end"}}>
      {editable && (
       <Button style={{color: "white", backgroundColor: "#3f51b5", height: "40px", marginTop:"10px"}} variant="contained" onClick={handleAddQualification}>
        ADD MORE
       </Button>
      )}
      </div>
   </div>
  </div>
 );
};

export default Index;