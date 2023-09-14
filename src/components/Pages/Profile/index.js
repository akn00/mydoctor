import SideBar from "../../SideBar/Index"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Profile.css"
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { useState } from "react";


const Index = () => {
    const userData=JSON.parse(localStorage.getItem("userInfo") || null)

    const [avatarImg,setAvatarImg]=useState();

    async function getPatientImage() {
        const queryParams = new URLSearchParams({
            avatar: 1,
            "$select[]": "avatarId",
        });
        let response = await fetch(
            `http://my-doctors.net:8090/patients/${userData.user._id
            }?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userData.accessToken}`,
                },

            });
        response = await response.json();
        setAvatarImg(response?.avatar?.buffer);
    }
    useState(()=>{
        getPatientImage();
    })

    return (<div className="myProfile">
        <SideBar />
        <div className="profileContent">
            <div>
                <p style={{
                    color: "#3f51b5",
                    fontSize: "36px",
                    fontWeight: "bold"
                }}>
                    My Profile
                </p>
            </div>
            <div className="profilePicWithButton">
                <div>
                    <Avatar style={{width:"120px", height:"120px"}} src={avatarImg || "/broken-image.jpg"}/>
                    
                    <p style={{
                        fontSize:"12px",
                        width:"100%",
                        color:"grey"
                    }}>
                    JPEG, JPG or PNG image less than 1 MB<br/>(Close up face picture looks great)
                    </p>
                </div>
                <div></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button style={{ backgroundColor: "#3f51b5", height:"40px"}} variant="contained">EDIT</Button>
                </div>
            </div>
            <div className="profileInputs">
                <TextField id="outlined-basic" label="Name" variant="outlined" />
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Gender" variant="outlined" />
                <TextField id="outlined-basic" label="Date of birth" variant="outlined" />
                <TextField id="outlined-basic" label="Bloodgroup" variant="outlined" />
                <TextField id="outlined-basic" label="House no./Street/Area" variant="outlined" />
                <TextField id="outlined-basic" label="Colony/Street/Locality" variant="outlined" />
                <TextField id="outlined-basic" label="City" variant="outlined" />
                <TextField id="outlined-basic" label="State" variant="outlined" />
                <TextField id="outlined-basic" label="Country" variant="outlined" />
                <TextField id="outlined-basic" label="Pincode" variant="outlined" />


            </div>
        </div>
    </div>);
}

export default Index;