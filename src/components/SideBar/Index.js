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


import { useNavigate } from "react-router-dom";
import React from "react";
const Index = () => {

    const [accDrawer,setAccDrawer]=React.useState(false);

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
        setAccDrawer(true);
        // navigate("/account");
    }

    const userId=localStorage.getItem("userInfo");
    console.log(userId.accessToken);

    return (
        <div className="sidebar">
            <List style={{ width: 240, borderRight: "1 grey solid", }}>
                <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDoctor}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Doctors" />
                </ListItem>
                <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={ClickSpeciality}>
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

                {userId&&<ListItem button style={{display:"flex", marginTop: 10, marginBottom: 10 }} onClick={clickAccount}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Account Settings" />
                </ListItem>}

                {accDrawer&&
                        <List>
                            <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickAppointments}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Profile" />
                        </ListItem>

                        <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickAppointments}>
                            <ListItemIcon>
                                <LockOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Change Password" />
                        </ListItem>
                    </List>
                    }
            </List>
        </div>
    );
}

export default Index;