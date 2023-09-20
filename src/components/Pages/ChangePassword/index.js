import SideBar from "../../SideBar/Index"
import { TextField,Button } from "@material-ui/core";
import "./ChangePassword.css"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';

const Index = () => {
    const [case1,setCase1]=useState(false);
    const [case2,setCase2]=useState(false);
    const [case3,setCase3]=useState(false);
    const [case4,setCase4]=useState(false);
    const [case5,setCase5]=useState(false);
    const [case6,setCase6]=useState(false);
    const [password,setPassword]=useState(null);
    const [oldPassword,setOldPassword]=useState("");
    const [result,setResult]=useState("");
    const [changePasswordValue,setChangePassword]=useState("");
    const [disabled,setDisabled]=useState(false);
    const [showError,setShowError]=useState(false);
    const userData = JSON.parse(localStorage.getItem("userInfo") || null)
    
    
    async function uploadPatientPassword() {
        try {
            const data={
                oldPassword:oldPassword,
                newPassword:password
            }
            
            let response = await fetch(
                `http://my-doctors.net:8090/patients/${userData.user._id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${userData.accessToken}`,
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(data),
                }
            );
            response = await response.json();
            if(response?.name){
                setResult("error")
            }
            else{
                setResult("success")
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    useEffect(()=>{
        
        if(oldPassword!=="" && case1 && case2 && case3 && case4 && case5 && case6 && !showError){
            setDisabled(false)
        }
        else{setDisabled(true)}
    })


    function newPassword(e){
        var upperCaseRgx=  /[A-Z]/
        var lowercaseCaseRgx=  /[a-z]/
        var digitsRgx=  /[0-9]/
        var specialCharacterRgx=  /[-'/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/
        var atLeastSixRgx=  /(?=.{6})/
        if(e.target.value===oldPassword){
            setShowError(true)
        }
        else{
            setShowError(false)
        }

        if(e.target.value.match(lowercaseCaseRgx)){
            setCase1(true)
        }
        else{
            setCase1(false)
        }
        if(e.target.value.match(upperCaseRgx)){
            setCase2(true)
        }
        else{
            setCase2(false)
        }
        if(e.target.value.match(specialCharacterRgx)){
            setCase3(true)
        }
        else{
            setCase3(false)
        }
        if(e.target.value.match(digitsRgx)){
            setCase4(true)
        }
        else{
            setCase4(false)
        }
        if(e.target.value.match(atLeastSixRgx)){
            setCase5(true)
        }
        else{
            setCase5(false)
        }
        if(e.target.value===changePasswordValue){
            setCase6(true)
        }
        else{
            setCase6(false)
        }
        setPassword(e.target.value);
    }

    function changePassword(e){
        setChangePassword(e.target.value)
        if(e.target.value===password){
            setCase6(true)
        }
        else{
            setCase6(false)
        }
    }

return ( <div style={{display:"flex"}}>
    <SideBar/>
    <div className="passwordFields" >
        {result==="error"&&<Alert severity="error" style={{width:"100%", maxWidth:"500px"}}>Error changing passweord</Alert>}
            {result==="success"&&<Alert severity="success" style={{width:"100%", maxWidth:"500px"}}>Password changed sucessfully</Alert>}
        <p style={{marginTop:0}}>
                Change Password
        </p>

        <div className="passwordInput" >
            
            <TextField id="outlined-basic" 
            label="Current Password" 
            variant="outlined" 
            style={{width:"100%", maxWidth:"500px"}} 
            onChange={(e)=>{
                setOldPassword(e.target.value)
                if(e.target.value===password){setShowError(true)} 
                else{setShowError(false)}
                }} />

            <div style={{width:"100%"}}>

                <TextField id="outlined-basic" 
                label="New Password" 
                variant="outlined" 
                style={{width:"100%", maxWidth:"500px"}} 
                onChange={newPassword} error={showError}/>

            {showError && 

            <p 
            style={{color: "red", 
            fontSize: "12px", 
            margin: 0, 
            marginLeft: "15px",
            fontWeight:"normal"}}>
                Current Password can't be same as New Password
            </p>}

            </div>

            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" style={{width:"100%", maxWidth:"500px"}} onChange={changePassword} />

            <div className="passwordChecks" >
            <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center", color:"black", fontWeight:"normal"}}>
                {case1?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
                A lowercase letter.</p>
            <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center", color:"black", fontWeight:"normal"}}>
                {case2?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
                An Uppercase letter.</p>
                
            <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center", color:"black", fontWeight:"normal"}}>
                {case3?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
                At least one special character.</p>
                
            <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center", color:"black", fontWeight:"normal"}}>
                {case4?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
                At least one number.</p>
                
            <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center", color:"black", fontWeight:"normal"}}>
                {case5?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
                At least six characters.  </p>
                
            <p style={{margin:0, fontSize: "14px",display:"flex", alignItem:"center", color:"black", fontWeight:"normal"}}>
                {case6?<DoneIcon color="success"/>:<CloseIcon color="error"/>}
                Passwords must match</p>
            </div>

            <Button variant="contained" disabled={disabled} onClick={uploadPatientPassword}>SUBMIT</Button>
            
        
        </div>
    </div>
    </div> );
}
 
export default Index;