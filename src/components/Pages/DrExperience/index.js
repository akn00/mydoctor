import { useState, useEffect } from "react";
import SideBar from "../../SideBar/Index";
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import ExperienceBox from "./DrExpBox";

const Index = () => {
  const userData = JSON.parse(localStorage.getItem("userInfo") || null);
  const [editable, setEditable] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [speciality_list, setSpeciality_list] = useState([]);
  const [speciality, setSpeciality] = useState(
    userData?.user?.profile?.specialities || []
  );
  const [experience, setExperience] = useState(
    userData?.user?.profile?.experience || []
  );
  const [license, setLicense] = useState(
    userData.user.profile.licenceNumber || ""
  );

  function specialityChange(e, value) {
    setSpeciality(value);
  }

  const fetchSpecializations = async () => {
    try {
      const response = await fetch(
        `http://my-doctors.net:8090/specializations?$limit=500`
      );
      const data = await response.json();
      setSpeciality_list(data.data);
      console.log(data.data)
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);
  
  useEffect(() => {
    
    const isExperienceEmpty = experience.some(
      (e) => !e.position || !e.place || !e.toYear || !e.toMonth || !e.fromYear || !e.fromMonth
    );

    // Update the state of the "SAVE" button
    setDisableSave(isExperienceEmpty);
  }, [experience]);

  const addEmptyExperience = () => {
    setExperience([...experience, {}]); // Add an empty object to the experience array
  };
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

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              gap: "10px",
            }}
          >
            {!editable && (
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#3f51b5",
                  height: "40px",
                }}
                variant="contained"
                onClick={() => {
                  setEditable(true);
                }}
              >
                EDIT
              </Button>
            )}
            {editable && (
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#3f51b5",
                  height: "40px",
                }}
                variant="contained"
                onClick={() => {
                    setExperience(userData?.user?.profile?.experience)
                  setEditable(false);
                }}
              >
                CANCEL
              </Button>
            )}
            {editable && (
              <Button
                style={{
                  color: disableSave ? "black" : "white",
                  backgroundColor: disableSave ? "" : "#3f51b5",
                  height: "40px",
                }}
                variant="contained"
                onClick={() => {
                  setEditable(false);
                }}
              >
                SAVE
              </Button>
            )}
          </div>
        </div>

        {/* content here */}

        <div
          className="ExperienceLicense"
          style={{
            border: "0.5px solid lightgray",
            backgroundColor: "white",
            borderRadius: "4px",
            padding: "20px",
            gap: "2%",
            display: "flex",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            label="License Number"
            variant="outlined"
            style={{ width: "33%" }}
            value={license}
            onChange={(e) => {
              setLicense(e.target.value);
            }}
            disabled={!editable}
            required
          />

          {/* <TextField
                        label="Speciality(ies)"
                        variant="outlined"
                        style={{ width: "33%" }}
                        disabled={!editable}
                        required
                    /> */}

          <Autocomplete
            multiple
            id="tags-outlined"
            options={speciality_list}
            getOptionLabel={(option) => option.name}
            filterSelectedOptions
            value={speciality.map((item) => item)}
            fullWidth
            disabled={!editable}
            style={{ width: "33%" }}
            onChange={specialityChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                required
                label="Speciality(ies)"
              />
            )}
          />
        </div>
        {experience.map((e, index) => (
          <ExperienceBox
            editable={editable}
            position={e.position}
            place={e.place}
            toYear={e.toYear}
            toMonth={e.toMonth}
            fromYear={e.fromYear}
            fromMonth={e.fromMonth}
          />
        ))}

        {/* content here */}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "self-end",
          }}
        >
          {editable && (
            <Button
              style={{
                color: "white",
                backgroundColor: "#3f51b5",
                height: "40px",
                marginTop: "10px",
              }}
              variant="contained"
              onClick={addEmptyExperience}
            >
              ADD MORE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
