import SideBar from "../../SideBar/Index"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Profile.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
import Input from '@mui/material/Input'; 
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";



const Index = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo") || null)

    const [avatarImg, setAvatarImg] = useState();
    const [editable, setEditable] = useState(false);
    const [saveActive, setSaveActive] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState('');
    const [bloodgroup, setBloodgroup] = useState('');
    const [house, setHouse] = useState('');
    const [colony, setColony] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const navigate =useNavigate();
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleBloodgroupChange = (event) => {
        setBloodgroup(event.target.value);
    };

    function handleName(e) {
        setName(e.target.value);
    }

    function handlePhone(e) {
        setPhone(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handleDOB(e) {
        setDOB(dayjs(e.target.value));
    }

    function handleHouse(e) {
        setHouse(e.target.value);
    }

    function handleColony(e) {
        setColony(e.target.value);
    }

    function handleCity(e) {
        setCity(e.target.value);
    }

    function handleState(e) {
        setState(e.target.value);
    }

    function handleCountry(e) {
        setCountry(e.target.value);
    }

    function handlePincode(e) {
        setPincode(e.target.value);
    }

    function handleEdit() {
        setEditable(true)
    }

    function handleSave() {
        setEditable(false)
    }

    function checkDisable() {
        if (name !== "" && phone !== "" && email !== "" && gender !== "" && name !== "" && dob !== "" && bloodgroup !== "" && house !== "" && colony !== "" && pincode !== "" && house.length >= 4 && colony.length >= 2 && pincode.length >= 6) {
            setSaveActive(true)
        }
        else {
            setSaveActive(false)
        }
    }

    async function getPatient() {

        let response = await fetch(
            `http://my-doctors.net:8090/patients/${userData.user._id
            }`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${userData.accessToken}`,
                },

            });
        response = await response.json();
        // console.log(response)
        setName(response?.firstName + " " + response?.lastName)
        setPhone(response?.contactNumber)
        setEmail(response?.email)
        setGender(response?.gender)
        setBloodgroup(response?.profile?.bloodType)
        setHouse(response?.profile?.address?.area)
        setColony(response?.profile?.address?.locality)
        setCity(response?.profile?.address?.city)
        setState(response?.profile?.address?.state)
        setCountry(response?.profile?.address?.country)
        setPincode(response?.profile?.address?.pincode)
        setDOB(dayjs(response?.profile.dob))
    }

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
    }

    async function uploadPatientImage(data) {
        try {
            console.log("uploading image...")
            let response = await fetch(
                `http://my-doctors.net:8090/patients/${userData.user._id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${userData.accessToken}`,
                    },
                    body: data,
                }
            );
            response = await response.json();
            console.log("upload status",response)
            // await navigate("/myprofile")
            return response;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    useEffect(() => {
        getPatient();
        getPatientImage();
    }, [])
    useEffect(() => {
        checkDisable();
    })

    const [imageUrl, setImageUrl] = useState(null);

    const handleFileUpload = async (event) => {
        console.log("fetching image...");
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = async () => {
          setImageUrl(file);
          const formData = new FormData();
          formData.append("avatar", file); // Use the original file, not imageUrl
          try {
            await uploadPatientImage(formData);
            // After successful upload, fetch the updated image
            getPatientImage();
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        };
      
        reader.readAsDataURL(file);
      };
      

    return (<div className="myProfile">
        <SideBar />
        <div className="profileContent">
            <div>
                <p style={{
                    color: "#3f51b5",
                    fontSize: "36px",
                    fontWeight: "bold"
                }}>
                    My Profile
                </p>
            </div>
            <div className="profilePicWithButton">
                <div>
                    <Avatar style={{ width: "120px", height: "120px" }} src={avatarImg || "/broken-image.jpg"} />

                    {editable &&
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px",
                            marginTop: "10px",
                            gap: "10px"
                        }}>

                            <div>
                                <label htmlFor="upload-image">
                                    <PhotoCameraIcon style={{ color: "#3f51b5", fontSize: 30, cursor: "pointer" }} />
                                </label>
                                <Input
                                    id="upload-image"
                                    style={{display:"none"}}
                                    accept="image/*"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                            </div>
                            <CloseIcon style={{ color: "gray", fontSize: 30 }} />
                        </div>
                    }

                    <p style={{
                        fontSize: "12px",
                        width: "100%",
                        color: "grey"
                    }}>
                        JPEG, JPG or PNG image less than 1 MB<br />(Close up face picture looks great)
                    </p>
                </div>
                <div></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {!editable && <Button style={{ backgroundColor: "#3f51b5", height: "40px" }} variant="contained" onClick={handleEdit} >EDIT</Button>}
                    {editable && <Button style={{ backgroundColor: !saveActive ? "" : "#3f51b5", height: "40px" }} variant="contained" onClick={handleSave} disabled={!saveActive}>SAVE</Button>}
                </div>
            </div>
            <div className="profileInputs">
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleName} disabled={!editable} />
                <TextField id="outlined-basic" label="Phone Number" variant="outlined" value={phone} onChange={handlePhone} disabled={true} />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleEmail} disabled={true} />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={handleGenderChange}
                        disabled={!editable}>
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                        <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Dte of Birth"
                        value={dob}
                        onChange={handleDOB}
                        disabled={!editable} />
                </LocalizationProvider>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Bloodgroup</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={bloodgroup}
                        label="Bloodgroup"
                        onChange={handleBloodgroupChange}
                        disabled={!editable}>
                        <MenuItem value={"A+"}>A+</MenuItem>
                        <MenuItem value={"A-"}>A-</MenuItem>
                        <MenuItem value={"B+"}>B+</MenuItem>
                        <MenuItem value={"AB-"}>AB-</MenuItem>
                        <MenuItem value={"AB+"}>AB+</MenuItem>
                        <MenuItem value={"O+"}>O+</MenuItem>
                        <MenuItem value={"O-"}>O-</MenuItem>
                    </Select>
                </FormControl>


                <TextField id="outlined-basic" label="House no./Street/Area" variant="outlined" value={house} onChange={handleHouse} disabled={!editable} />
                <TextField id="outlined-basic" label="Colony/Street/Locality" variant="outlined" value={colony} onChange={handleColony} disabled={!editable} />
                <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={handleCity} disabled={!editable} />
                <TextField id="outlined-basic" label="State" variant="outlined" value={state} onChange={handleState} disabled={!editable} />
                <TextField id="outlined-basic" label="Country" variant="outlined" value={country} onChange={handleCountry} disabled={!editable} />
                <TextField id="outlined-basic" label="Pincode" variant="outlined" type="number" value={pincode} onChange={handlePincode} disabled={!editable} />


            </div>
        </div>
    </div>);
}

export default Index;