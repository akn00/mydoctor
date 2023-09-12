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

    
    useEffect(()=>{
        const searchParams = location.pathname;
        
        if(searchParams==="/myprofile"){
            setAccDrawer(true);
            console.log(searchParams)
            console.log(accDrawer);
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

        if(searchParams==="/specialities"){
            setSpecialitiesSelected(true)
        }
        else{
            setSpecialitiesSelected(false)
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

    let userId=localStorage.getItem("userInfo");
   

    return (
        <div className="sidebar">
            <List style={{ width: 240, borderRight: "1 grey solid", }}>
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

                {userId&&<ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickAppointments}>
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
            </List>
        </div>
    );
}

export default Index;