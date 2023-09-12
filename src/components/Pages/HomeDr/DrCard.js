import React from 'react';
import "./DrCard.css"
// import dummyImg from "../../../assets/SpecialitiesDummyImg.svg"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const DrCard = ({ doctor }) => {
    const [hospital, setHospital] = React.useState();
    const experience = Math.floor((doctor?.profile?.experienceMonths || []) / 12)

    React.useEffect(() => {
        let hospitalName = "Not Available";

        if (doctor?.profile?.experience) {
            for (const exp of doctor.profile.experience) {
                if (exp.toYear) {
                    hospitalName = "Not Available";
                } else {
                    hospitalName = exp.place;
                    break;
                }
            }
        }

        setHospital(hospitalName);
    }, [doctor]);

    const navigate =useNavigate();
    function handleClickDr(){
        navigate(`/doctor/${doctor._id}`)
    }

    return (
        <div className='cardDr' onClick={handleClickDr}>
            <Card variant="outlined" style={{height:"100%"}}>
                <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "2rem",padding: "1.8rem 1.2rem"}}>
                    <div className='drCardMain'>
                    
                    <div className='drCardlogo'>
                        <Box style={{ backgroundColor: "lightGrey", borderRadius: "50%" }}>
                            <PersonIcon style={{ color: "white", height: "80px", width: "80px" }} />
                        </Box>
                    </div> 

                    <div className='drCardContent'>
                        <div className='withoutButton'>
                    <Typography color="text.primary" style={{ fontWeight: "bold" }}>
                        Dr. {doctor.firstName} {doctor.lastName}
                    </Typography>
                    <Typography style={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {(doctor?.profile?.qualifications || []).map((qualification) => (
                            qualification?.name
                        )).join(" | ")}
                        {<br />}

                        {(doctor?.profile?.specialities || []).map((specialitie) => (
                            specialitie?.name
                        )).join(" | ")}

                        {<br />}
                        {experience > 0 && `${experience} years experience`}


                    </Typography>
                    <Typography style={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Hospital : {hospital}{<br />}
                        Languages : {(doctor?.profile?.languages || ["Not available"]).map((language) => (
                            language
                        )).join(", ")}
                        {<br />}
                        Next Available :Not available
                    </Typography>
                    </div>
                    <Button variant="outlined" size='small' style={{borderRadius:"25px",flexGrow:0 , flexShrink:0 , bottom:"0"}}>BOOK APPOINTMENT</Button>
                    </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default DrCard;

