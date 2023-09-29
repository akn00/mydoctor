import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";

const Index = (props) => {
  

  const [changedName,setChangedName]=useState(props.name);
  const [changedInsitute,setChangedInsitute]=useState(props.institute);
  const [changedYear,setChangedYear]=useState(props.year);

  useEffect(() => {
    props.qualification[props.index].name = changedName;
    props.setQualification([...props.qualification]); // Update qualification in DrQualification
  }, [changedName]);
  
  useEffect(() => {
    props.qualification[props.index].institute = changedInsitute;
    props.setQualification([...props.qualification]); // Update qualification in DrQualification
  }, [changedInsitute]);
  
  useEffect(() => {
    props.qualification[props.index].year = changedYear;
    props.setQualification([...props.qualification]); // Update qualification in DrQualification
  }, [changedYear]);
  

  return ( 
  <div style={{border:"0.5px solid lightgray", backgroundColor:"white", borderRadius:"4px", padding:"20px", gap:"2%", display:"flex", marginTop:"20px" }}>
  <TextField
   label="Name"
   variant="outlined"
   value={changedName}
   style={{width:"33%"}}
   disabled={!(props.editable)}
   onChange={(e) =>{setChangedName(e.target.value)}
   }
  />
  <TextField
   label="Institute"
   variant="outlined"
   style={{width:"33%"}}
   value={changedInsitute}
   disabled={!(props.editable)}
   onChange={(e) =>{setChangedInsitute(e.target.value)}}
  />
  <TextField
   label="Year"
   variant="outlined"
   style={{width:"33%"}}
   value={changedYear}
   type="number"
   disabled={!(props.editable)}
   onChange={(e) =>{setChangedYear(e.target.value)}
   }
  />

  <IconButton aria-label="delete row" disabled={!(props.editable)} onClick={()=>{props.deleteBox(props.index)}}>
  <ClearIcon/>
  </IconButton>
 </div> 
 );
}

export default Index;