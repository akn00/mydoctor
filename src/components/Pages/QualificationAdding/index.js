import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";

const Index = (props) => {
    

    const [changedName,setChangedName]=useState("");
    const [changedInsitute,setChangedInsitute]=useState("");
    const [changedYear,setChangedYear]=useState("");

    useEffect(() => {
        for (let i = 0; i < props.qualification.length; i++) {
            if(props.index===i){
                props.qualification[i].name=changedName;
            }
        }
    }, [changedName, setChangedName]);

    useEffect(() => {
        for (let i = 0; i < props.qualification.length; i++) {
            if(props.index===i){
                props.qualification[i].institute=changedInsitute;
            }
        }
    }, [changedInsitute, setChangedInsitute]);

    useEffect(() => {
        for (let i = 0; i < props.qualification.length; i++) {
            if(props.index===i){
                props.qualification[i].year=changedYear;
            }
        }
    }, [changedYear, setChangedYear]);
    

    return ( 
    <div style={{border:"0.5px solid lightgray", backgroundColor:"white", borderRadius:"4px", padding:"20px", gap:"2%", display:"flex"}}>
    <TextField
      label="Name"
      variant="outlined"
      value={props.name||changedName}
      style={{width:"33%"}}
      disabled={!(props.editable)}
      onChange={(e) =>{setChangedName(e.target.value)}
      }
    />
    <TextField
      label="Institute"
      variant="outlined"
      style={{width:"33%"}}
      value={props.institute}
      disabled={!(props.editable)}
      onChange={(e) =>
        props.setNewQualification({
          ...props.newQual,
          institute: e.target.value,
        })
      }
    />
    <TextField
      label="Year"
      variant="outlined"
      style={{width:"33%"}}
      value={props.year}
      disabled={!(props.editable)}
      onChange={(e) =>
        props.setNewQualification({
          ...props.newQual,
          year: e.target.value,
        })
      }
    />

    <IconButton aria-label="delete row" onClick={()=>{props.deleteBox(props.index)}}>
    <ClearIcon/>
    </IconButton>
  </div> 
  );
}
 
export default Index;