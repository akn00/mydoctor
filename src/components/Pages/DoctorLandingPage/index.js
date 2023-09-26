import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import "./DoctorLandingPage.css";
import SideBar from "../../SideBar/Index";
import { useNavigate, useParams } from 'react-router-dom';
import Rating from "./Rating"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabPanel,TabContext} from '@mui/lab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

export default function Index({setSelectedDoctorValue}) {
    const [expanded, setExpanded] = React.useState(false);
    const [doctor, setDoctor] = React.useState([]);
    const [slots, setSlots] = React.useState([]);
    const [value, setValue] = React.useState(0);
    const [showLogin, setShowLogin] = React.useState(false);
    const navigate = useNavigate()

    const handleChangeSlot = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const params = useParams();
    const bracketStart = "("
    const bracketEnd = ")"

    const userData = JSON.parse(localStorage.getItem("userInfo") || null)

    function bookSlotClick(slot){
        if(!userData){
            setShowLogin(true);
        }
        else{
            setShowLogin(false);
            setSelectedDoctorValue({id:params.id,
            slot:slot})
            navigate("/book-appointment")
        }
    }



    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://my-doctors.net:8090/doctors/${params.id}`);
                const data = await response.json();
                setDoctor(data);
                // console.log(data)
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        }

        async function getNumbersOfSlots(id) {
            const currentTime = new Date().toISOString();
            const queryParams = new URLSearchParams({
                doctorId: id,
                "startTime[$gte]": currentTime,
                "$sort[startTime]": 1,
            });
            const url = `http://my-doctors.net:8090/slots?${queryParams.toString()}`;

            let response = await fetch(url);
            response = await response.json();
            setSlots(response.data);
            console.log(response)
        }

        getNumbersOfSlots(params.id)
        fetchData();
    }, [params.id]);
    const experience = Math.round((doctor?.profile?.experienceMonths) / 12)
    // console.log(doctor?.profile?.specialities)
    return (
        <div className='drDetailsMain'>
            <SideBar />

            <div className='drDetailsPage'>
                {doctor.firstName ?
                    <>
                        <div className='detailsCard'>
                            <Card style={{ maxWidth: "50%", padding: "12px", margin: "12px" }}>
                                <CardHeader
                                    style={{ margin: "12px" }}
                                    avatar={
                                        <Avatar style={{ backgroundColor: red[500] }} aria-label="recipe">
                                            {doctor.firstName} {doctor.lastName}
                                        </Avatar>
                                    }
                                    title={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                                    subheader={doctor?.profile?.experienceMonths ? `${experience} Years of Experience` : "No experience"}
                                />

                                <CardContent >
                                    <Typography variant="body2" color="text.secondary" style={{ margin: "12px" }}>
                                        {doctor?.profile?.bio ? doctor?.profile?.bio : "Bio not available"}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing style={{ margin: "12px" }}>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                            <div style={{ padding: "12px" }}>
                                <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                                    <TabContext value={value}>
                                    <Paper elevation={4}> {/* Add elevation to Paper */}
                                        <Tabs
                                            value={value}
                                            onChange={handleChangeSlot}
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                        >
                                            {slots.map((slot) => (
                                                <Tab label={dayjs(slot.startTime).format("MMM DD, YY")} value={slot.startTime} />
                                            ))}
                                        </Tabs>
                                    </Paper>
                                    {slots.map((slot) => (
                                                <TabPanel value={slot.startTime}>
                                                <Button variant="outlined" 
                                                style={{borderRadius:"25px", fontSize:"0.8125rem",minWidth:"auto", lineHeight:"auto", padding:"auto"}}
                                                onClick={()=>{bookSlotClick(slot)}}>
                                                {`${dayjs(slot.startTime).format("hh:mm A")} - ${dayjs(slot.endTime).format("hh:mm A")}`}
                                                </Button>
                                                </TabPanel>
                                            ))}
                                    
                                    </TabContext>
                                </Box>

                                {showLogin && <p style={{color:"red"}}>Please  {<a href='/login'>Sign in</a>} / {<a href="/login">Register</a>}  to book an appointment.</p>}
                            </div>
                        </div>

                        <div className='drAccordion'>
                            <p>
                                Consultation Fee: {doctor?.profile?.consultationFee ? doctor?.profile?.consultationFee : "Not available"}
                            </p>
                            <Accordion expanded={expanded === 'specialities'} onChange={()=>{handleChange('specialities')}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="specialities-content"
                                    id="specialities-header"
                                >
                                    <Typography color='text.primary' style={{ fontWeight: "bold" }}>Specialities</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {
                                            doctor?.profile?.specialities && doctor.profile.specialities.length > 0 ?
                                                (
                                                    <ul>
                                                        {doctor.profile.specialities.map((specialitie) => (
                                                            <li>{specialitie.name}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No specialities available</p>
                                                )
                                        }

                                    </Typography>
                                </AccordionDetails>

                            </Accordion>

                            <Accordion expanded={expanded === 'qualifications'} onChange={()=>{handleChange('qualifications')}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="qualifications-content"
                                    id="qualifications-header"
                                >
                                    <Typography color='text.primary' style={{ fontWeight: "bold" }}>Qualifications</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {
                                            doctor?.profile?.qualifications && doctor.profile.qualifications.length > 0 ?
                                                (
                                                    <ul>
                                                        {doctor.profile.qualifications.map((qualification) => (
                                                            <li>{qualification.name}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No qualifications available</p>
                                                )
                                        }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'Experience'} onChange={()=>{handleChange('Experience')}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="qualifications-content"
                                    id="qualifications-header"
                                >
                                    <Typography color='text.primary' style={{ fontWeight: "bold" }}>Experience</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {
                                            doctor?.profile?.experience && doctor.profile.experience.length > 0 ?
                                                (
                                                    <ul>
                                                        {doctor.profile.experience.map((exp) => (
                                                            <li>{exp?.position} at {exp?.place} {bracketStart}{exp?.fromYear}-{exp?.toYear}{bracketEnd}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No experience available</p>
                                                )
                                        }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'Languages'} onChange={()=>{handleChange('Languages')}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="qualifications-content"
                                    id="qualifications-header"
                                >
                                    <Typography color='text.primary' style={{ fontWeight: "bold" }}>Languages</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {
                                            doctor?.profile?.languages && doctor.profile.languages.length > 0 ?
                                                (
                                                    <ul>
                                                        {doctor.profile.languages.map((language) => (
                                                            <li>{language}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No languages available</p>
                                                )
                                        }
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'Reviews'} onChange={()=>{handleChange('Reviews')}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="qualifications-content"
                                    id="qualifications-header"
                                >
                                    <Typography color='text.primary' style={{ fontWeight: "bold" }}>Reviews</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        No reviews available
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'WriteaReview'} onChange={()=>{handleChange('WriteaReview')}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="qualifications-content"
                                    id="qualifications-header"
                                >
                                    <Typography color='text.primary' style={{ fontWeight: "bold" }}>Write a Review</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Rating />
                                </AccordionDetails>
                            </Accordion>
                            {/* Add more controlled Accordions following the same pattern */}
                        </div>
                    </> : "Loading doctor details..."
                }
            </div>
        </div >
    );
}
