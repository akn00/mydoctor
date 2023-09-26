import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SideBar from "../../SideBar/Index"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./BookAppointment.css";
import dayjs from "dayjs";
import { Divider } from "@mui/material";
import card1 from "../../../assets/visa.svg"
import card2 from "../../../assets/american_express.svg"
import card3 from "../../../assets/maestro.svg"
import card4 from "../../../assets/unionpay.svg"
import card5 from "../../../assets/western_union.svg"
import card6 from "../../../assets/master_card.svg"
import card7 from "../../../assets/jcb.svg"
import MenuItem from '@material-ui/core/MenuItem';

const Index = ({selectedDoctorValue,setShowAppointmentError}) => {

    const [activeStep,SetAvtiveStep]=useState(0);
    const [backDisable,SetBackDisable]=useState(true);
    const [disable1,SetDisable1]=useState(true);
    const [disable2,SetDisable2]=useState(true);
    const [makePaymentDisable,SetMakePaymentDisable]=useState(true);
    const [nextDisable,SetNextDisable]=useState(false);
    const [securityCodeError,setSecurityCodeError]=useState(false);
    const [cardError,setCardError]=useState(false);
    const [newPatientName,SetNewPatientName]=useState("");
    const [newPatientNumber,SetNewPatientNumber]=useState("");
    const [doctor,setDoctor]=useState([]);

    const navigate=useNavigate();

    const currentYear = new Date().getFullYear(); // Get the current year
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
    };

    const years = [];
    for (let i = currentYear; i <= currentYear + 30; i++) {
        years.push(i);
    }

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Get the current month (1-based index)

    const handleChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
    };

    const months = [
        { value: 1, label: '01 | January' },
        { value: 2, label: '02 | February' },
        { value: 3, label: '03 | March' },
        { value: 4, label: '04 | April' },
        { value: 5, label: '05 | May' },
        { value: 6, label: '06 | June' },
        { value: 7, label: '07 | July' },
        { value: 8, label: '08 | August' },
        { value: 9, label: '09 | September' },
        { value: 10, label: '10 | October' },
        { value: 11, label: '11 | November' },
        { value: 12, label: '12 | December' },
    ];

    useEffect(() => {
       setDoctor(selectedDoctorValue?.slot?.doctor)
    //    console.log(selectedDoctorValue?.slot)
    },[activeStep])

    useEffect(()=>{if(!selectedDoctorValue)
        {navigate("/")}
    },[selectedDoctorValue])

    const steps = [
        'Patient Details',
        'Appointment Details',
        'Payment Details',
      ];
    const [value, setValue] = React.useState('myself');

    const handleChange = (event) => {
    setValue(event.target.value);
    };

    const userData=JSON.parse(localStorage.getItem("userInfo") || null)
    useEffect(()=>{
        if(value==="someone"){
            if(newPatientName && newPatientNumber){
                SetNextDisable(false)
            }
            else{
                SetNextDisable(true)
            }
        }
        if(value==="myself"){
            SetNextDisable(false)
        }
        if(activeStep>0){
            SetBackDisable(false)
        }
        else{
            SetBackDisable(true)
        }
    },[value,activeStep])


    function handleSecurityCode (e){
        const securityCode=e.target.value
        if(securityCode.length<3){
            setSecurityCodeError(true)
            SetDisable1(true)
        }
        else{
            setSecurityCodeError(false)
            SetDisable1(false)
        }
        
    }
    function handleCardNumber(e){
        const cardNumber=e.target.value;
        if(cardNumber.length<16){
            setCardError(true)
            SetDisable2(true)
        }
        else{
            setCardError(false)
            SetDisable2(false)
        }
    }

    useEffect(()=>{
        checkPaymentDisabled()
    },[disable1,disable2])

    function checkPaymentDisabled(){
        if(disable1 || disable2){
            SetMakePaymentDisable(true)
        }
        else{
            SetMakePaymentDisable(false)
        }
    }

    return ( 
        <div style={{display:"flex"}}>
        <SideBar/>
        <div style={{display:"flex",flexDirection:"column",width:"100%", padding:"32px"}}>
            <Paper elevation={0} style={{ padding:"24px",width:"auto", height:"fit-content" }}>
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
            <div className="appointmentDetails">
                <p style={{fontSize:"2.125rem", margin:"0"}}>Patient Details</p>
                <div className="internalDetails">
                    This appointment is for:

                     <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="myself" control={<Radio color="primary" />} label="Myself" />
                        <FormControlLabel value="someone" control={<Radio color="primary"/>} label="Someone Else" />     
                    </RadioGroup>
                    <div className="AppointPAge1input">
                    Please provide the following information about the patient:
                    <br/>
                    <br/>
                    <br/>
                    {value==="myself"&&<>
                    <TextField id="outlined-basic" label="Patient Name" value={userData.user.firstName+" "+ userData.user.lastName} variant="outlined" disabled fullWidth/>
                    <br/>
                    <br/>
                    <br/>
                    <TextField id="outlined-basic" label="Patient's Mobile number" value={userData.user.contactNumber} variant="outlined" disabled fullWidth/>
                    </>}
                    {value==="someone"&&<>
                    <TextField id="outlined-basic" label="Patient Name" variant="outlined" value={newPatientName} onChange={(e)=>{SetNewPatientName(e.target.value)}} fullWidth/>
                    <br/>
                    <br/>
                    <br/>
                    <TextField id="outlined-basic" type="number" label="Patient's Mobile number" value={newPatientNumber} variant="outlined" onChange={(e)=>{SetNewPatientNumber(e.target.value)}} fullWidth/>
                    </>}
                    <br/>
                    <br/>
                    Fee: Rs {doctor?.profile?.consultationFee}
                    <br/>
                    <br/>
                    </div>
                </div>
                <div className="AppointmentButtons">
                    <Button variant="contained" disabled={backDisable} >
                    Back
                    </Button>
                    <Button variant="contained" color="primary" disabled={nextDisable} onClick={()=>{SetAvtiveStep(activeStep+1)}}>
                    Next
                    </Button>
                </div>
            </div>
            }

            {activeStep===1&&
            <div className="appointmentDetails">
                <p style={{fontSize:"2.125rem", margin:"0"}}>Appointment Details</p>
                <div className="internalDetails">

                <div className="makeGrid">
                <Typography style={{height:"fit-content"}}>
                Patient's name
                </Typography>
                <Typography style={{height:"fit-content"}}>
                {userData.user.firstName+" "+ userData.user.lastName}
                </Typography>
                </div>

                <Divider style={{height:"0"}}/>

                <div className="makeGrid">
                <Typography style={{height:"fit-content"}}>
                Patient's contact number
                </Typography>
                <Typography style={{height:"fit-content"}}>
                {userData.user.contactNumber}
                </Typography>
                </div>
                <Divider/>

                <div className="makeGrid">
                <Typography style={{height:"fit-content"}}>
                Consultation fee
                </Typography>
                <Typography style={{height:"fit-content"}}>
                {doctor?.profile?.consultationFee}
                </Typography>
                </div>
                <Divider/>

                <div className="makeGrid">
                <Typography style={{height:"fit-content"}}>
                Doctor's name
                </Typography>
                <Typography style={{height:"fit-content"}}>
                {"Dr. "+doctor.firstName+" "+doctor.lastName}
                </Typography>
                </div>
                <Divider/>

                <div className="makeGrid">
                <Typography style={{height:"fit-content"}}>
                Appointment date
                </Typography>
                <Typography style={{height:"fit-content"}}>
                {dayjs(selectedDoctorValue?.slot.startTime).format("dddd, DD MMM, YY")}
                </Typography>
                </div>
                <Divider/>

                <div className="makeGrid">
                <Typography style={{height:"fit-content"}}>
                Appointment time
                </Typography>
                <Typography style={{height:"fit-content"}}>
                {dayjs(selectedDoctorValue?.slot.startTime).format("hh:mm A") + " - " + dayjs(selectedDoctorValue?.slot.endTime).format("hh:mm A")}
                </Typography>
                </div>
                <Divider/>

                </div>
                <div className="AppointmentButtons">
                    <Button variant="contained" style={{color:"black", backgroundColor:"transparent", boxShadow:"none", border:" 0.5px solid lightGrey"}}  disabled={backDisable} onClick={()=>{SetAvtiveStep(activeStep-1)}} >
                    BACK
                    </Button>
                    <Button variant="contained" color="primary" disabled={nextDisable} onClick={()=>{SetAvtiveStep(activeStep+1)}}>
                    CONFIRM AND PROCEED
                    </Button>
                </div>
            </div>
            }

            {activeStep===2&&
            <div className="appointmentDetails">
                <p style={{fontSize:"2.125rem", margin:"0"}}>Payment Details</p>
                <div className="internalDetails">
                Accepted Credit/Debit Cards

                
                <img src={card1} style={{width: "9%", marginLeft: "2%"}} alt=" visa cards accepted"/>
                <img src={card3} alt=" visa cards accepted"/>
                <img src={card5} alt=" visa cards accepted"style={{width: "31%", marginLeft: "2%"}}/>
                <img src={card4} alt=" visa cards accepted"style={{width: "9%", marginLeft: "2%"}}/>
                <img src={card2} alt=" visa cards accepted"style={{width: "9%", marginLeft: "2%"}}/>
                <img src={card6} alt=" visa cards accepted"style={{width: "9%", marginLeft: "2%"}}/>
                <img src={card4} alt=" visa cards accepted"style={{width: "9%", marginLeft: "2%"}}/>
                <img src={card7} alt=" visa cards accepted"/>
                {/* <img src={VisaIcon} alt=" visa cards accepted"/> */}


                <TextField 
                id="outlined-basic" 
                // type="number" 
                label="Credit/Debit Card Number" 
                inputProps={{maxLength:16}} 
                variant="outlined" 
                error={cardError} 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
                onBlur={handleCardNumber}
                />
                {cardError&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid 16 digit card Number</p>}
                <br/>
                <br/>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                <TextField
                id="outlined-select-currency"
                select
                label="Expiration month"
                value={selectedMonth}
                onChange={handleChangeMonth}
                style={{width:"fit-content"}}
                >
                {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                    {month.label}
                    </MenuItem>
                ))}
                </TextField>

                

                <TextField
                id="outlined-select-currency"
                select
                label="Expiration year"
                value={selectedYear}
                onChange={handleChangeYear}
                style={{width:"fit-content"}}
                >
                {years.map((year) => (
                    <MenuItem key={year} value={year}>
                    {year}
                    </MenuItem>
                ))}
                </TextField>
                </div>

                <br/>
                <br/>

                <TextField id="outlined-basic" type="number" label="Security code" error={securityCodeError} variant="outlined" placeholder="XXXX" onBlur={handleSecurityCode}/>
                {securityCodeError&&<p style={{color: "red", fontSize: "12px", margin: 0, marginLeft: "15px"}}>Please enter a valid security code</p>}
                    
                </div>
                <div className="AppointmentButtons">
                    <Button variant="contained" color="primary" disabled={backDisable} onClick={()=>{SetAvtiveStep(activeStep-1)}} >
                    BACK
                    </Button>
                    <Button 
                    variant="contained" 
                    color="primary" 
                    disabled={makePaymentDisable} 
                    onClick={()=>{
                        setShowAppointmentError(true); 
                        console.log(userData.user.role);
                        userData.user.role==="patient"?
                        navigate("/appointments"):navigate("/doctor-appointments")
                        }}>
                    MAKE PAYMENT
                    </Button>
                </div>
            </div>
            }
        </div>
    </div> );
}
 
export default Index;