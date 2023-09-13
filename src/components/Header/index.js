import logo from "../../assets/logo.svg";
import React, { useState, useEffect } from "react";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, InputBase, IconButton } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import HamburgerDrawer from "../HamburgerDrawer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';


const Header = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const userId=localStorage.getItem("userInfo")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  function handleLogout(){
    localStorage.setItem("userInfo","")
    handleClose()
    navigate("/")
  }


  const userData=JSON.parse(localStorage.getItem("userInfo"))
    const [avatarImg,setAvatarImg]=useState();
    // console.log(userData)
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
        // console.log("from header",response.avatar)
    }
    useState(()=>{
        getPatientImage();
    },[])



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

        {userId ?<div className='drCardlogo'>
          <Box 
          style={{ backgroundColor: "#bdbdbd", borderRadius: "50%" }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
                    <Avatar style={{width:"40px", height:"40px"}} src={avatarImg || "/broken-image.jpg"}/>
          </Box>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose} style={{gap:"10px"}}>
          <PermIdentityIcon />
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleClose} style={{gap:"10px"}}>
          <CalendarTodayIcon/>
          My Appointments
        </MenuItem>
        <MenuItem onClick={handleLogout} style={{gap:"10px"}}>
        <ExitToAppIcon/>
          Logout
        </MenuItem>
      </Menu>
        </div>
        :
        <div className="buttonLogin">
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
        
        }
      </div>

      <div className="smallHeader">
        <div className="upper">
          <HamburgerDrawer />
          <div className="logo">
            <img src={logo} alt="logo" onClick={handleLogoClick} />
          </div>
          {userId ?<div className='drCardlogo'>
          <Box 
          style={{ backgroundColor: "#bdbdbd", borderRadius: "50%" }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            <PersonIcon fontSize="large" style={{ color: "white", paddingLeft:"3px", paddingRight:"3px"}} />
          </Box>
          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose} style={{gap:"10px"}}>
          <PermIdentityIcon />
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleClose} style={{gap:"10px"}}>
          <CalendarTodayIcon/>
          My Appointments
        </MenuItem>
        <MenuItem onClick={handleLogout} style={{gap:"10px"}}>
        <ExitToAppIcon/>
          Logout
        </MenuItem>
      </Menu>
        </div>
        :
        <div className="buttonLogin">
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </div>
        
        }
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
