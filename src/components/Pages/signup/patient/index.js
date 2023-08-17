import React from 'react';
import DateOfBirth from "../../../DateOfBirth"
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "./patient.css"
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const Index = () => {

    const [gender, setGender] = React.useState('male');
    const [ValidateName, setValidatename]=React.useState(false);
    const [ValidatePassword, setValidatePassword]=React.useState(false);
    const [ValidateEmail, setValidateEmail]=React.useState(false);
    const [ValidatePhone, setValidatePhone]=React.useState(false);
    const [disable,setDisable]=React.useState(true);
    const [case1,setCase1]=React.useState(false);
    const [case2,setCase2]=React.useState(false);
    const [case3,setCase3]=React.useState(false);
    const [case4,setCase4]=React.useState(false);
    const [case5,setCase5]=React.useState(false);
    const [case6,setCase6]=React.useState(false);
    const [trunBlueOn,setTurnBlueOn]=React.useState(true);
    const [show,setShow]=React.useState(false);
    const [password,setPassword]=React.useState("")

    let count=0;
function handlePasswordClick() {
    setShow(true);
}


function verifyPassword(e) {
    
    var upperCaseRgx=  /[A-Z]/
    var lowercaseCaseRgx=  /[a-z]/
    var digitsRgx=  /[0-9]/
    var specialCharacterRgx=  /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/
    var atLeastSixRgx=  /(?=.{6})/
    setPassword(e.target.value);
    setTurnBlueOn(false);

    if(e.target.value.match(upperCaseRgx)){
        setCase1(true)
    }
    else{setCase1(false)}
    
    if(e.target.value.match(lowercaseCaseRgx)){
        setCase2(true)
    }
    else{setCase2(false)}
    
    if(e.target.value.match(digitsRgx)){
        setCase3(true)
    }
    else{setCase3(false)}
    
    if(e.target.value.match(specialCharacterRgx)){
        setCase4(true)
    }
    else{setCase4(false)}
    
    if(e.target.value.match(atLeastSixRgx)){
        setCase5(true)
    }
    else{setCase5(false)}

    return password;
}
function handleConfirmPassword(e) {
    if (e.target.value===password) {
        setCase6(true);  
    }
    else{setCase6(false)}
}
function ckeckDisabled(){
    
    if(count>=4){
        if(!ValidateName && !ValidatePassword && !ValidateEmail && !ValidatePhone){
        setDisable(false)
        }
    }
    else{
        setDisable(true)
    }
}

    function validateN(e){
        if(e.target.value===""){
            setValidatename(true);
            count--
            ckeckDisabled()
        }
        else{
            setValidatename(false);
            count++;
            ckeckDisabled()
        }
    }
    function validatP(e){
        if(e.target.value===""){
            setValidatePhone(true);
            count--;
            ckeckDisabled()
        }
        else{
            if(e.target.value.length===10)
            {setValidatePhone(false)
            count++
            ckeckDisabled()}
            else {
                setValidatePhone(true); // Add this line
                count--;
                ckeckDisabled();
            }
        }
    }
    function validatE(e){
        var emailRgx=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(e.target.value===""){
            setValidateEmail(true);
            count--;
            ckeckDisabled()
        }
        else{
            if(e.target.value.match(emailRgx))
            {setValidateEmail(false)
            count++
            ckeckDisabled()}
            else {
                setValidateEmail(true); // Add this line
                count--;
                ckeckDisabled();
            }
        }
    }
    function validatPS(e){
        if(e.target.value===""){
            setValidatePassword(true);
            count--;
            ckeckDisabled()
        }
        else{
            setValidatePassword(false)
            count++
            ckeckDisabled()
        }
    }

 
    return (    
        <div className='patientSignup'>
            
            <h2>Create an account</h2>
            <label>Full Name*</label>
            <OutlinedInput type="text" placeholder="Enter name" required={true} error={ValidateName} onBlur={validateN} />
            {ValidateName && <p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid name !</p>}
            <br/>
            <label>Gender*</label>
            <FormControl>
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                    row
                    >
                    <FormControlLabel value="male" control={<Radio color='primary'/>} label="Male" />
                    <FormControlLabel value="female" control={<Radio color='primary'/>} label="Female" />
                    <FormControlLabel value="other" control={<Radio color='primary'/>} label="Other" />
                </RadioGroup>
            </FormControl>
        <label>Date of Birth*</label>
        <DateOfBirth/><br/>


            <label>Mobile Number*</label>
            <OutlinedInput type='number' placeholder="Enter Mobile Number" required={true} error={ValidatePhone} onBlur={validatP}  />
            {ValidatePhone&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid 10 digit phone number!</p>}
            <br/>
            <label>Email*</label>
            <OutlinedInput type="email" placeholder="abc@gmail.com" required={true}  error={ValidateEmail} onBlur={validatE}/>
            {ValidateEmail&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid name !</p>}
            <br/>
            <label>Create Password*</label>
            <OutlinedInput type="password" placeholder="create password" onChange={verifyPassword} onClick={handlePasswordClick} required={true}  error={ValidatePassword} onBlur={validatPS}/>
            {ValidatePassword&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Password cannot be empty!</p>}
            <br/>
            <label>Confirm Password*</label>
            <OutlinedInput type="password" placeholder="confirm password" required={true} onChange={handleConfirmPassword} /><br/>
            
            {show&&<div>
                <p style={{margin:0, fontSize: "14px", }}>
                    {trunBlueOn?<RadioButtonUncheckedIcon color='primary'/>:case1?<CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>:<CancelOutlinedIcon color='error'/>}
                    Must contain lowercase letter.</p>
                <p style={{margin:0, fontSize: "14px"}}>
                    {trunBlueOn?<RadioButtonUncheckedIcon color='primary'/>:case2?<CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>:<CancelOutlinedIcon color='error'/>}
                    Must contain Uppercase letter.</p>
                <p style={{margin:0, fontSize: "14px"}}>
                    {trunBlueOn?<RadioButtonUncheckedIcon color='primary'/>:case4?<CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>:<CancelOutlinedIcon color='error'/>}
                    Must contain at least one special character.</p>
                <p style={{margin:0, fontSize: "14px"}}>
                    {trunBlueOn?<RadioButtonUncheckedIcon color='primary'/>:case3?<CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>:<CancelOutlinedIcon color='error'/>}
                    Must contain at least one number.</p>
                <p style={{margin:0, fontSize: "14px"}}>
                    {trunBlueOn?<RadioButtonUncheckedIcon color='primary'/>:case5?<CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>:<CancelOutlinedIcon color='error'/>}
                    Must contain at least 6 characters.  </p>
                <p style={{margin:0, fontSize: "14px"}}>
                    {trunBlueOn?<RadioButtonUncheckedIcon color='primary'/>:case6?<CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>:<CancelOutlinedIcon color='error'/>}
                    Passwords must match</p>
            </div>}
            
            <div>
                <Button variant="contained" color='primary' disabled={disable}>REGISTER</Button>
            </div>
            <p >Alraedy have an account? <a href='/'>Sign in</a></p>

        </div> 
    );
}
 
export default Index;
