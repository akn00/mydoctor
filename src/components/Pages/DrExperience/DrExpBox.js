import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import Switch from "@mui/material/Switch";

const DrExpBox = (props) => {
  const [startDate, setStartDate] = useState(
    props.fromMonth && props.fromYear
      ? dayjs(`${props.fromYear}-${props.fromMonth}`)
      : null
  );
  const [endDate, setEndDate] = useState(
    props.toMonth && props.toYear
      ? dayjs(`${props.toYear}-${props.toMonth}`)
      : null
  );

  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [position, setPosition] = useState(props.position);
  const [hospital, setHospital] = useState(props.place);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleStartDateChange = (date) => {
    setStartDate(dayjs(date));
    console.log(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(dayjs(date));
    console.log(date);
  };

  return (
    <div
      style={{
        display: "flex",
        border: "0.5px solid lightgray",
        backgroundColor: "white",
        marginTop: "20px",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "50%", alignItems: "center" }}>
        <TextField
          variant="outlined"
          label="Position"
          required
          disabled={!props.editable}
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
          }}
          style={{ width: "66%", marginTop: "10px", marginBottom: "15px" }}
        />
        <TextField
          variant="outlined"
          label="Hospital/Clinic"
          required
          disabled={!props.editable}
          value={hospital}
          onChange={(e) => {
            setHospital(e.target.value);
          }}
          style={{ width: "66%", marginTop: "15px", marginBottom: "10px" }}
        />
      </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <MobileDatePicker
              value={startDate}
              disabled={!(props.editable)}
              views={["month", "year"]}
              onChange={handleStartDateChange}
            />
            <p
              style={{ color: "#696969", fontSize: "15px", marginLeft: "15px" }}
            >
              Start
              <br />
              Date*
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Switch
              {...label}
              disabled={!props.editable}
              onChange={() => {
                setCurrentlyWorking(!currentlyWorking);
              }}
            />{" "}
            <p style={{ margin: 0,color: "#696969", fontSize: "15px", }}>Currently working</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <MobileDatePicker
              value={endDate}
              views={["month", "year"]}
              onChange={handleEndDateChange}
              disabled={currentlyWorking || !props.editable}
            />
            <p
              style={{ color: "#696969", fontSize: "15px", marginLeft: "15px" }}
            >
              End
              <br />
              Date*
            </p>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default DrExpBox;
