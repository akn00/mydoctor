import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import "./patient.css"

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
const Index = () => {
    const [gender, setGender] = React.useState('male');
    const [dobMonth, setDobMonth] = React.useState('');
    const [dobDay, setDobDay] = React.useState('');
    const [dobYear, setDobYear] = React.useState('');

    return (    
        <div className='patientSignup'>
            <label>Full Name*</label>
            <OutlinedInput type="text" placeholder="Enter name" required={true}  />

            <FormControl>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
            </FormControl>

            <label>Mobile Number*</label>
            <OutlinedInput type='number' placeholder="Enter Mobile Number" required={true}  />
            <label>Email*</label>
            <OutlinedInput type="email" placeholder="abc@gmail.com" required={true}  />
            <label>Create Password*</label>
            <OutlinedInput type="password" placeholder="create password" required={true}  />
            <label>Confirm Password*</label>
            <OutlinedInput type="password" placeholder="confirm password" required={true}  />
        </div> 
    );
}
 
export default Index;
