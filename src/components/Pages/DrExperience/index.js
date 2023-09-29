import { useState } from "react";
import SideBar from "../../SideBar/Index"
import { Button, TextField } from "@material-ui/core";



const Index = () => {
    const [editable, setEditable] = useState(false);
    const [disableSave, setDisableSave] = useState(false);

    return (
        <div style={{ display: "flex" }}>
            <SideBar />
            <div style={{ padding: "32px", width: "100%", minHeight: "73vh" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p
                        style={{
                            color: "#000000",
                            fontSize: "25px",
                            fontWeight: "bold",
                            margin: 0,
                            width: "100%",
                        }}
                    >
                        My Qualifications
                    </p>

                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px", }}>
                        {!editable && (<Button style={{ color: "white", backgroundColor: "#3f51b5", height: "40px", }} variant="contained" onClick={() => { setEditable(true); }}>
                            EDIT
                        </Button>
                        )}
                        {editable && (
                            <Button style={{ color: "white", backgroundColor: "#3f51b5", height: "40px", }} variant="contained" onClick={() => { setEditable(false); }}>
                                CANCEL
                            </Button>
                        )}
                        {editable && (
                            <Button style={{ color: disableSave ? "black" : "white", backgroundColor: disableSave ? "" : "#3f51b5", height: "40px", }} variant="contained" onClick={() => { setEditable(false); }} >
                                SAVE
                            </Button>
                        )}
                    </div>
                </div>

                {/* content here */}
                <div style={{ border: "0.5px solid lightgray", backgroundColor: "white", borderRadius: "4px", padding: "20px", gap: "2%", display: "flex", marginTop: "20px", display:"flex", justifyContent:"space-evenly"}}>
                    <TextField
                        label="License Number"
                        variant="outlined"
                        style={{ width: "33%" }}
                        disabled={!editable}
                        required
                    />
                    
                    <TextField
                        label="Speciality(ies)"
                        variant="outlined"
                        style={{ width: "33%" }}
                        disabled={!editable}
                        required
                    />

                    

                </div>










                {/* content here */}

                <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", alignItems: "self-end" }}>
                    {editable && (
                        <Button style={{ color: "white", backgroundColor: "#3f51b5", height: "40px", marginTop: "10px" }} variant="contained">
                            ADD MORE
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Index;