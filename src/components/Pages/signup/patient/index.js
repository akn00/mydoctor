import React,{useState} from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "./patient.css";
import DateOfBirth from "../../../DateOfBirth";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Alert from '@mui/material/Alert';

const Index = () => {

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    
    const [gender, setGender] = React.useState('male');
    const [name,setName ] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password,setPassword ] = React.useState('');
    const [mobNumber,setMobnumber ] = React.useState('');
    const [signupStatus, setSignupStatus]=React.useState(false);
    const [ValidateName, setValidatename]=React.useState(false);
    const [ValidatePassword, setValidatePassword]=React.useState(false);
    const [ValidateEmail, setValidateEmail]=React.useState(false);
    const [ValidatePhone, setValidatePhone]=React.useState(false);
    const [ValidateName1, setValidatename1]=React.useState(false);
    const [ValidatePassword1, setValidatePassword1]=React.useState(false);
    const [ValidateEmail1, setValidateEmail1]=React.useState(false);
    const [ValidatePhone1, setValidatePhone1]=React.useState(false);
    const [ValidatePhoneExist, setValidatePhoneExist]=React.useState(false);
    const [ValidateEmailExist, setValidateEmailExist]=React.useState(false);
    const [CP, setCP]=React.useState(false);
    const [disable,setDisable]=React.useState(true);
    const [case1,setCase1]=React.useState(false);
    const [case2,setCase2]=React.useState(false);
    const [case3,setCase3]=React.useState(false);
    const [case4,setCase4]=React.useState(false);
    const [case5,setCase5]=React.useState(false);
    const [case6,setCase6]=React.useState(false);
    const [trunBlueOn,setTurnBlueOn]=React.useState(true);
    const [show,setShow]=React.useState(false);

function handlePasswordClick() {
    setShow(true);
}


function verifyPassword(e) {

    if(e.target.value===""){
        setValidatePassword1(false)
    }
    else{
        setValidatePassword1(true)
    }
    
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
        setCP(true)
    }
    else{setCase6(false)
    setCP(false)}
}

function ckeckDisabled(){
    if(ValidateName1 && ValidatePassword1 && ValidateEmail1 && ValidatePhone1 && CP){
        setDisable(false)
    }
    else{
        setDisable(true)
    }
}

    function validateN(e){
        if(e.target.value===""){
            setValidatename(true);
            ckeckDisabled()
        }
        else{
            setValidatename(false);
            ckeckDisabled()
        }
    }
    function validatP(e){
        if(e.target.value===""){
            setValidatePhone(true);
            ckeckDisabled()
        }
        else{
            if(e.target.value.length===10)
            {setValidatePhone(false)
            ckeckDisabled()}
            else {
                setValidatePhone(true); 
                ckeckDisabled();
            }
        }
    }
    function validatE(e){
        var emailRgx=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(e.target.value===""){
            setValidateEmail(true);
            ckeckDisabled()
        }
        else{
            if(e.target.value.match(emailRgx))
            {setValidateEmail(false)
            ckeckDisabled()}
            else {
                setValidateEmail(true);
                ckeckDisabled();
            }
        }
    }
    function validatPS(e){
        if(e.target.value===""){
            setValidatePassword(true);
            ckeckDisabled()
        }
        else{
            setValidatePassword(false)
            ckeckDisabled()
        }
    }

    function onNameChnage(e){
        if(e.target.value===""){
            setValidatename1(false)
        }
        else{
            setValidatename1(true)
            setName(e.target.value)
        }
    }

    async function alreadyExistCheckP(e){
        const mobileNumber=e.target.value;
        setMobnumber(mobileNumber)
        if(mobileNumber===""){
            setValidatePhone1(false)
        }
        else{setValidatePhone1(true)}

        let result = await fetch(`http://my-doctors.net:8090/accounts?contactNumber=${mobileNumber}`,{
            method:"GET"      
        })
        result = await result.json();
        // console.log(result);

        if(result.name==="account exists"){
            setValidatePhoneExist(true);
        }
        else{
            setValidatePhoneExist(false);
        }

    }
    async function alreadyExistCheckE(e){
        const email=e.target.value;
        setEmail(email)
        if(email===""){
            setValidateEmail1(false)
        }
        else{
            setValidateEmail1(true)
        }
        let result = await fetch(`http://my-doctors.net:8090/accounts?email=${email}`,{
            method:"GET"      
        })
        result = await result.json();
        // console.log(result);

        if(result.name==="account exists"){
            setValidateEmailExist(true);
        }
        else{
            setValidateEmailExist(false);
        }

    }
let fullName=name.split(" ");
const data={firstName:fullName[0],
    lastName:fullName[1],
    email:email,
    password:password,
    contactNumber:mobNumber,
    gender:gender,
    profile:{
        dob:`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

}


    async function handleRegister(){
        let result = await fetch("http://my-doctors.net:8090/patients",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({...data}),
                
            
        })
        result = await result.json();
        console.log(data.profile.dob)
        if(result.name==="NotFound"){
            setSignupStatus(false)
        }
        else{
            setSignupStatus(true)
            setName("")
            setEmail("")
            setMobnumber("")
            setPassword("")

        }
    }
 
    return (    
        <div className='patientSignup'>
            
            <h2>Create an account</h2>
            {signupStatus&&<Alert severity="success">Signed up sucessfully</Alert>}
            <label>Full Name*</label>
            <OutlinedInput type="text" placeholder="Enter name" value={name} required={true} error={ValidateName} onBlur={validateN} onChange={onNameChnage}/>
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
                <DateOfBirth day={day} month={month} year={year} setDay={setDay} setMonth={setMonth} setYear={setYear} /><br/>
                

            <label>Mobile Number*</label>
            <OutlinedInput type='number' placeholder="Enter Mobile Number" value={mobNumber} required={true} error={ValidatePhone} onBlur={validatP}  onChange={alreadyExistCheckP}/>
            {ValidatePhone&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid 10 digit phone number!</p>}
            {ValidatePhoneExist &&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Mobile number already exists!</p>}
            <br/>
            <label>Email*</label>
            <OutlinedInput type="email" placeholder="abc@gmail.com" required={true} value={email}  error={ValidateEmail} onBlur={validatE} onChange={alreadyExistCheckE}/>
            {ValidateEmail&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid email!</p>}
            {ValidateEmailExist&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>email already exist!</p>}
            <br/>
            <label>Create Password*</label>
            <OutlinedInput type="password" placeholder="create password" value={password} onChange={verifyPassword} onClick={handlePasswordClick} required={true}  error={ValidatePassword} onBlur={validatPS}/>
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
                <Button variant="contained" color='primary' disabled={disable} onClick={handleRegister}>REGISTER</Button>
            </div>
            <p >Alraedy have an account? <a href='/'>Sign in</a></p>

        </div> 
    );
}
 
export default Index;
