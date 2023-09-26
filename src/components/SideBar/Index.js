import "./SideBar.css"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import BubbleChartSharpIcon from '@material-ui/icons/BubbleChartSharp';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from "react-router-dom";


import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Index = () => {

    const location = useLocation();
    const [accDrawer,setAccDrawer]=React.useState(false);
    const [homeSelected,setHomeSelected]=React.useState(false);
    const [myProfileSelected,setMyProfileSelected]=React.useState(false);
    const [specialitiesSelected,setSpecialitiesSelected]=React.useState(false);
    const [changePasswordSelected,setChangePasswordSelected]=React.useState(false);
    
    const [dashboard,setDashboard]=React.useState(false);
    const [drProfile,setDrProfile]=React.useState(false);
    const [drQualification,setDrQualification]=React.useState(false);
    const [drExperience,setDrExperience]=React.useState(false);
    const [drAppointment,setDrAppointment]=React.useState(false);
    const [appointment,setAppointment]=React.useState(false);
    const [drDrawer,setDrDrawer]=React.useState(false);

    
    useEffect(()=>{
        const searchParams = location.pathname;
        
        if(searchParams==="/myprofile"){
            setAccDrawer(true);
            setMyProfileSelected(true)
        }
        else{
            setMyProfileSelected(false)
            if(searchParams==="/changepassword"){
                setAccDrawer(true)
                setChangePasswordSelected(true)
            }
            else{
                setAccDrawer(false)
                setChangePasswordSelected(false)
            }
        }
        
        if(searchParams==="/"){
            setHomeSelected(true)
        }
        else{
            setHomeSelected(false)
        }
        
        if(searchParams==="/appointments"){
            setAppointment(true)
        }
        else{
            setAppointment(false)
        }

        if(searchParams==="/specialities"){
            setSpecialitiesSelected(true)
        }
        else{
            setSpecialitiesSelected(false)
        }
// ----------------------doctor's---------------------
        if(searchParams==="/doctor-dashboard"){
            setDashboard(true)
        }
        else{
            setDashboard(false)
        }
        
        if(searchParams==="/doctor-appointments"){
            setDrAppointment(true)
        }
        else{
            setDrAppointment(false)
        }

        if(searchParams==="/doctor-profile"){
            setDrDrawer(true);
            setDrProfile(true)
        }
        else{
            setDrProfile(false)
            if(searchParams==="/doctor-profile/qualification"){
                setDrDrawer(true)
                setDrQualification(true)
            }
            else{
                setDrQualification(false)
                if(searchParams==="/doctor-profile/experience"){
                    setDrDrawer(true)
                    setDrExperience(true)
                }
                else{
                    setDrDrawer(false)
                    setDrExperience(false)
                }
            }
            
        }

        
        
    },[location])

    const navigate= useNavigate();

    function ClickSpeciality(){
        navigate("/specialities");
    }

    function clickDoctor(){
        navigate("/");
    }

    function clickAppointments(){
        navigate("/appointments");
    }

    function clickAccount(){
        navigate("/myprofile");
    }

    function clickChangePs(){
        navigate("/changepassword");
    }

// --------------------doctor's------------------

    function clickDashboard(){
        navigate("/doctor-dashboard");
    }

    function clickDrProfile(){
        navigate("/doctor-profile")
    }
    function clickDrQualifications(){
        navigate("/doctor-profile/qualification")
    }
    function clickDrExperience(){
        navigate("/doctor-profile/experience")
    }
    function clickDrAppointment(){
        navigate("/doctor-appointments")
    }

    let userId=JSON.parse(localStorage.getItem("userInfo")||null);
   

    return (
        <div className="sidebar">
            <List style={{ width: 240, borderRight: "1 grey solid", }}>
                
                {userId?.user?.role==="doctor"?
                 <>
                 <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDashboard} selected={dashboard}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                 <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDrProfile} >
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Doctor Profile" />
                </ListItem>
                {drDrawer &&
                        <>
                            <ListItem button style={{ marginTop: 10, marginBottom: 10, marginLeft:"20%",width:"auto" }} onClick={clickDrProfile} selected={drProfile}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Personal Information" />
                            </ListItem>

                            <ListItem button style={{ marginTop: 10, marginBottom: 10, marginLeft:"20%",width:"auto" }} onClick={clickDrQualifications} selected={drQualification} >
                                <ListItemIcon>
                                    <LockOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Quaifications" />
                            </ListItem>
                            <ListItem button style={{ marginTop: 10, marginBottom: 10, marginLeft:"20%",width:"auto" }} onClick={clickDrExperience} selected={drExperience} >
                                <ListItemIcon>
                                    <LockOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Experience" />
                            </ListItem>
                        </>
                    }
                 <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDrAppointment} selected={drAppointment}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Appointments" />
                </ListItem>
                 <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDoctor} selected={homeSelected}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Reviews" />
                </ListItem>
                 </>
                 :
                 <>
                 <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDoctor} selected={homeSelected}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Doctors" />
                </ListItem>
                <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={ClickSpeciality} selected={specialitiesSelected}>
                    <ListItemIcon>
                        <BubbleChartSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Specialities" />
                </ListItem>

                {userId&&<ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickAppointments} selected={appointment}>
                    <ListItemIcon>
                        <EventNoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Appointments" />
                </ListItem>}

                {userId&&<ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickAccount}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Account Settings" />
                </ListItem>}

                {accDrawer&&
                        <>
                            <ListItem button style={{ marginTop: 10, marginBottom: 10, marginLeft:"20%",width:"auto" }} onClick={clickAccount} selected={myProfileSelected}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Profile" />
                            </ListItem>

                            <ListItem button style={{ marginTop: 10, marginBottom: 10, marginLeft:"20%",width:"auto" }} onClick={clickChangePs} selected={changePasswordSelected} >
                                <ListItemIcon>
                                    <LockOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Change Password" />
                            </ListItem>
                        </>
                    }
                    </>
                    }
            </List>
        </div>
    );
}

export default Index;