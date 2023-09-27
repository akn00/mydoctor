import { useState } from "react";
import SideBar from "../../SideBar/Index"
import { Button } from "@material-ui/core";

const Index = () => {

    const userData = JSON.parse(localStorage.getItem("userInfo") || null)
    const [editable, setEditable] = useState(false);
    const [qualification, setQualification] = useState(userData?.user?.profile?.qualifications || [])

    return (
        <div style={{ display: "flex" }}>
            <SideBar />
            <div style={{ padding: "32px", width: "100%", minHeight: "73vh" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p style={{
                        color: "#000000",
                        fontSize: "25px",
                        fontWeight: "bold",
                        margin: 0,
                        width: "100%"
                    }}>
                        My Qualifications
                    </p>

                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", gap: "10px" }}>
                        {!editable && <Button style={{ color: "white", backgroundColor: "#3f51b5", height: "40px" }} variant="contained" onClick={() => { setEditable(true) }} >EDIT</Button>}
                        {editable && <Button style={{ color: "white", backgroundColor: "#3f51b5", height: "40px" }} variant="contained" onClick={() => { setEditable(false) }}>CANCEL</Button>}
                        {editable && <Button style={{ color: "white", backgroundColor: "#3f51b5", height: "40px" }} variant="contained" onClick={() => { setEditable(false) }}>SAVE</Button>}
                    </div>
                </div>

                {!editable && !qualification &&
                    <div style={{ color: "#696969", display: "flex", fontSize: "20px", alignItems: "center", justifyContent: "center" }}>
                        No Qualification added
                    </div>}

                {qualification &&
                    <div>
                        {userData?.user?.profile?.qualifications.map((qualification, index) => (
                            <div key={index}>
                                <p>Name: {qualification.name}</p>
                                <p>Institute: {qualification.institute}</p>
                                <p>Year: {qualification.year}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default Index;