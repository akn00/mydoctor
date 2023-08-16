import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import "./patient.css"
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';


const Index = () => {
    const [gender, setGender] = React.useState('male');
    const [ValidateName, setValidatename]=React.useState(false);
    const [ValidatePassword, setValidatePassword]=React.useState(false);
    const [ValidateEmail, setValidateEmail]=React.useState(false);
    const [ValidatePhone, setValidatePhone]=React.useState(false);
    const [disable,setDisable]=React.useState(true);
    let count=0;

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
            setValidatePhone(false)
            count++
            ckeckDisabled()
        }
    }
    function validatE(e){
        if(e.target.value===""){
            setValidateEmail(true);
            count--;
            ckeckDisabled()
        }
        else{
            setValidateEmail(false)
            count++
            ckeckDisabled()
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
            <label>Mobile Number*</label>
            <OutlinedInput type='number' placeholder="Enter Mobile Number" required={true} error={ValidatePhone} onBlur={validatP}  />
            {ValidatePhone&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid 10 digit phone number!</p>}
            <br/>
            <label>Email*</label>
            <OutlinedInput type="email" placeholder="abc@gmail.com" required={true}  error={ValidateEmail} onBlur={validatE}/>
            {ValidateEmail&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid name !</p>}
            <br/>
            <label>Create Password*</label>
            <OutlinedInput type="password" placeholder="create password" required={true}  error={ValidatePassword} onBlur={validatPS}/>
            {ValidatePassword&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Password cannot be empty!</p>}
            <br/>
            <label>Confirm Password*</label>
            <OutlinedInput type="password" placeholder="confirm password" required={true}  /><br/>
            
            <div>
                <p><CheckCircleOutlineOutlinedIcon style={{ color : 'green'}}/>Must contain lowercase letter.</p>
                <p><CancelOutlinedIcon color='error'/>Must contain Uppercase letter.</p>
                <p>Must contain at least one special character.</p>
                <p>Must contain at least one number.</p>
                <p>Must contain at least 6 characters.  </p>
                <p> Passwords must match</p>
            </div>
            
            <div>
                <Button variant="contained" color='primary' disabled={disable}>REGISTER</Button>
            </div>
            <p >Alraedy have an account? <a href='/'>Sign in</a></p>

        </div> 
    );
}
 
export default Index;
