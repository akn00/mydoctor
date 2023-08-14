import React, { useState } from "react";
import "./loginNav.css";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Divider from "@material-ui/core/Divider";
import Login from "../Pages/login"
import PatientSignup from "../Pages/signup/patient"
import DoctorSignup from "../Pages/signup/doctor"
import LoginImg from "../../assets/loginBg.svg"
import SignupImg from "../../assets/signupBg.svg"

const LoginNav = () => {
  const [value, setValue] = useState(0);

  const renderTabContent = () => {
    if (value === 0) {
      return <Login/>;
    } else if (value === 1) {
      return <PatientSignup/>;
    } else if (value === 2) {
      return <DoctorSignup/>;
    }
    return null;
  };
  const renderImage = () => {
    
    if (value === 0) {

      return <img src={LoginImg} alt="Login Background"/>;
    } else if (value === 1) {
      return <img src={SignupImg} alt="Signup Background"/>;
    } else if (value === 2) {
      return <img src={SignupImg} alt="Signup Background"/>;
    }
    return null;
  };

  return (
    <div className="loginNav">
      <div className="empty">
        <div className="space">

        </div>
        {renderImage()}
        </div>
      <div className="loginTab">
        <div className="tabs">
         
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              variant="fullWidth"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <Tab label="LOGIN" value={0}
              style={{padding:"6px 12px"}}/>
              <Divider
                orientation="vertical"
                style={{ height: "3rem", alignSelf: "center" }}
              />
              <Tab label="PATIENT SIGN UP" value={1}
              style={{padding:"6px 12px"}}/>
              <Divider
                orientation="vertical"
                style={{ height: "3rem", alignSelf: "center" }}
              />
              <Tab label="DOCTOR SIGN UP" value={2}
              style={{padding:"6px 12px"}}/>
            </Tabs>
          
        </div>

        <div className="tabContent">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default LoginNav;
