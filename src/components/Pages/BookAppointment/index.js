import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SideBar from "../../SideBar/Index"

const Index = ({selectedDoctorValue}) => {

    const [activeStep,SetAvtiveStep]=useState(0);
    const navigate=useNavigate();
    useEffect(()=>{if(!selectedDoctorValue)
        {navigate("/")}
    },[selectedDoctorValue])

    const steps = [
        'Patient Details',
        'Appointment Details',
        'Payment Details',
      ];

    return ( 
        <div style={{display:"flex"}}>
        <SideBar/>
        <div style={{display:"flex",flexDirection:"column",width:"100%", padding:"32px"}}>
            <Paper elevation={0} style={{ padding:"24px",width:"90%", height:"fit-content" }}>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
            return (
                <Step key={label}>
                <StepLabel>
                <Typography sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                {label}
                </Typography>
                </StepLabel>
                </Step>
            );
            })}
            </Stepper>
            </Paper>

            {activeStep===0&&
            <>
                <p style={{fontSize:"2.125rem", margin:"0"}}>Patient Details</p>
            </>
            }

            {activeStep===1&&
            <>
                <p style={{fontSize:"2.125rem", margin:"0"}}>patient details</p>
            </>
            }

            {activeStep===2&&
            <>
                <p style={{fontSize:"2.125rem", margin:"0"}}>patient details</p>
            </>
            }
        </div>
    </div> );
}
 
export default Index;