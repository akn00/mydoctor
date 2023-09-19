import SideBar from "../../SideBar/Index"
import { TextField,Button } from "@material-ui/core";
import "./ChangePassword.css"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from "react";

const Index = () => {
    const [case1,setCase1]=useState(true);
    const [case2,setCase2]=useState(false);
    const [case3,setCase3]=useState(false);
    const [case4,setCase4]=useState(false);
    const [case5,setCase5]=useState(false);
    const [case6,setCase6]=useState(false);
    return ( <div style={{display:"flex"}}>
    <SideBar/>
    <div className="passwordFields" >
        <p style=
            {{
                color: "#3f51b5",
                fontSize: "26px",
                fontWeight: "bold"
            }}>
                Change Password
        </p>

        <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
        <TextField id="outlined-basic" label="Current Password" variant="outlined" fullWidth/>
        <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth/>
        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth={true}/>
        <Button variant="contained" style={{backgroundColor:"#3f51b5",color:"white"}}>SUBMIT</Button>
        <div>
        <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center"}}>
            {case1?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
            A lowercase letter.</p>
        <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center"}}>
            {case2?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
            An Uppercase letter.</p>
            
        <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center"}}>
            {case3?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
            At least one special character.</p>
            
        <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center"}}>
            {case4?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
            At least one number.</p>
            
        <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center"}}>
            {case5?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
            At least six characters.  </p>
            
        <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center"}}>
            {case6?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
            Passwords must match</p>
        </div>
            
        
        </div>
    </div>
    </div> );
}
 
export default Index;