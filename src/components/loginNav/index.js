import React, { useState } from "react";
import "./loginNav.css";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Divider from "@material-ui/core/Divider";

const LoginNav = () => {
  const [value, setValue] = useState(0);

  const renderTabContent = () => {
    if (value === 0) {
      return <div>Login content goes here</div>;
    } else if (value === 1) {
      return <div>Patient Sign Up content goes here</div>;
    } else if (value === 2) {
      return <div>Doctor Sign Up content goes here</div>;
    }
    return null;
  };

  return (
    <div className="loginNav">
      <div className="empty"></div>
      <div className="loginTab">
        <div className="tabs">
          <Paper elevation={0}>
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <Tab label="LOGIN" value={0}
              style={{padding:"6px 12px"}}/>
              <Divider
                orientation="vertical"
                style={{ height: 50, alignSelf: "center" }}
              />
              <Tab label="PATIENT SIGN UP" value={1}/>
              <Divider
                orientation="vertical"
                style={{ height: 50, alignSelf: "center" }}
              />
              <Tab label="DOCTOR SIGN UP" value={2}/>
            </Tabs>
          </Paper>
        </div>

        <div className="tabContent">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default LoginNav;
