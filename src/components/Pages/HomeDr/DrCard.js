import React from 'react';
// import "./CardSp.css"
import dummyImg from "../../../assets/SpecialitiesDummyImg.svg"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'; 



const DrCard = ({ doctor }) => {
    const[hospital,setHospital]=React.useState();
    const experience=Math.floor((doctor?.profile?.experienceMonths || [])/12)

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


    
    return (
        <div className='cardSp'>
            <Card variant="outlined">
                <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "2rem" }}>
                    <img src={dummyImg} alt="card img" style={{ width: "100PX" }} />
                    <Typography color="text.primary" style={{ fontWeight: "bold" }}>
                        Dr. {doctor.firstName} {doctor.lastName}
                    </Typography>
                    <Typography style={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {(doctor?.profile?.qualifications || []).map((qualification) => (
                            qualification?.name 
                        )).join(" | ")}
                        {<br/>}

                        {(doctor?.profile?.specialities || []).map((specialitie) => (
                            specialitie?.name 
                        )).join(" | ")}

                        {<br/>}
                        {experience > 0 && `${experience} years experience`}

                        
                    </Typography>
                    <Typography style={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        Hospital : {hospital}
                        Languages : {(doctor?.profile?.languages||[]).map((language) => (
                            language 
                        )).join(", ")}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default DrCard;

 