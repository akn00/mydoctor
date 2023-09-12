import SideBar from "../../SideBar/Index"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Profile.css"

const Index = () => {
    return ( <div className="myProfile">
        <SideBar/>
        <div className="profileContent">
            <div>
            <p style={{color: "#3f51b5",
                       fontSize: "36px",
                       fontWeight: "bold"}}>
            My Profile
            </p>
            </div>
            <div className="profilePicWithButton">
                <div>profile pic</div>
                <div></div>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button variant="contained">EDIT</Button>
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
    </div> );
}
 
export default Index;