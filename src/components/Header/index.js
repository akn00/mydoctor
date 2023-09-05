import logo from "../../assets/logo.svg";
import React, { useState, useEffect } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, InputBase, IconButton } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import HamburgerDrawer from "../HamburgerDrawer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Header = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [specializations, setSpecializations] = useState([]);

  const fetchSpecializations = async () => {
    try {
      const response = await fetch(
        `http://my-doctors.net:8090/specializations?$limit=500`
      );
      const data = await response.json();
      setSpecializations(data.data);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };
  
  function searchHandle(){
    navigate(`/search?sp=${selectedValue}`)
  }

  useEffect(() => {
    fetchSpecializations();
  }, []);

  function handleLoginClick() {
    navigate("login");
  }

  function handleLogoClick() {
    navigate("/");
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const speciality = searchParams.get("sp");

  useEffect(() => {
    speciality ? setSelectedValue(speciality) : setSelectedValue("");
  }, [speciality]);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" onClick={handleLogoClick} />
        </div>
        <div className="searchBar">
          <Autocomplete
            id="specialtyInput"
            value={selectedValue}
            style={{minWidth:"227px"}}
            onChange={(event, newValue) => {handleChange(event); setSelectedValue(newValue)}}
            options={specializations.map(
              (specialization) => specialization.name
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select a service"
                variant="outlined"
                InputLabelProps={{ shrink: false }} // Disable floating label
                style={{backgroundColor:"#fafafa" }}
                className="customcss"
              />
            )}
          />
          <div className="search">
            <InputBase
              placeholder="Search Doctors"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton aria-label="search" onClick={searchHandle}>
              <SearchIcon />
            </IconButton>
          </div>
        </div>

        <div className="buttonLogin">
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
      </div>

      <div className="smallHeader">
        <div className="upper">
          <HamburgerDrawer />
          <div className="logo">
            <img src={logo} alt="logo" onClick={handleLogoClick} />
          </div>
          <div className="buttonLogin">
            <Button variant="contained" color="primary" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </div>

        <div className="lower">
          <div className="searchBar">
          <Autocomplete
            id="specialtyInput"
            value={selectedValue}
            onChange={(event, newValue) => setSelectedValue(newValue)}
            options={specializations.map(
              (specialization) => specialization.name
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select a service"
                variant="outlined"
                InputLabelProps={{ shrink: false }} // Disable floating label
              />
            )}
          />
            <div className="search">
              <InputBase
                placeholder="Search Doctors"
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton aria-label="search" onClick={()=>(navigate(`/doctor/${selectedValue}`))}>
                <SearchIcon  />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
