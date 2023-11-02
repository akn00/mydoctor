import SideBar from "../../SideBar/Index"
import TextField from "@mui/material/TextField"
import Alert from '@mui/material/Alert'
import MenuItem from "@mui/material/MenuItem"
const Index = ({showAppointmentError}) => {

    return (
    <div style={{display:"flex"}}>
        <SideBar/>
        <div style={{display:"flex", flexDirection:"column", padding:"32px", width:"100%", minHeight:"71.7vh"}}>
            <div style={{display:"flex", justifyContent:"space-between", width:"100%", marginBottom:"1rem"}}>

                <p style={{
                            color: "#3f51b5",
                            fontSize: "32px",
                            fontWeight: "bold",
                            margin:0
                        }}>
                        My Appointments
                </p>
                <div style={{display:"flex" ,alignItems:"center", gap:"0.5rem"}}>
                    <p style={{
                                color: "rgba(0, 0, 0, 0.54)",
                                margin:0
                            }}>
                    Number of records  
                    </p>
                    <TextField
                    id="filled-select-page"
                    select
                    size="small"
                    defaultValue="10"
                    variant="standard"
                    
                    >
                        <MenuItem  value="5">
                            5
                        </MenuItem>
                        <MenuItem  value="10">
                            10
                        </MenuItem>
                        <MenuItem  value="20">
                            20
                        </MenuItem>
                        <MenuItem  value="30">
                            30
                        </MenuItem>
                    </TextField>
                </div>
            </div>
            {showAppointmentError && <Alert severity="error">Appointment booking failed!</Alert>}
            <div style={{backgroundColor:"white", display:"flex", justifyContent:"center"}}>
                <p style={{color: "#9e9e9e", padding: "2rem 1rem",margin:0,  fontSize: "1rem"}}>
                    No appointments are made yet
                </p>
            </div>
        </div>
    </div> );
}
 
export default Index;