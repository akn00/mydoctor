import { useEffect, useState } from "react";
import SideBar from "../../SideBar/Index"
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const Index = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo") || null)

    const [avatarImg, setAvatarImg] = useState();
    const [editable, setEditable] = useState(false);
    

    async function getDoctorImage() {
        const queryParams = new URLSearchParams({
            avatar: 1,
            "$select[]": "avatarId",
        });
        let response = await fetch(
            `http://my-doctors.net:8090/doctors/${userData.user._id
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

    async function uploadDoctorImage(data) {
        try {
            
            let response = await fetch(
                `http://my-doctors.net:8090/doctors/${userData.user._id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${userData.accessToken}`,
                    },
                    body: data,
                }
            );
            response = await response.json();
            
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = async () => {
        //   setImageUrl(file);
          const formData = new FormData();
          formData.append("avatar", file); 
          try {
            await uploadDoctorImage(formData);
            getDoctorImage();
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        };
      
        reader.readAsDataURL(file);
      };

    useEffect(() => {
        getDoctorImage();
    }, [])

    return ( 
    <div style={{display:"flex"}}>
        <SideBar/>
        <div style={{padding:"32px", width:"100%"}}> 
            <p style={{
                    color: "#000000",
                    fontSize: "25px",
                    fontWeight: "bold",
                    margin:0
                }}>
                My profile
            </p>  
            <div> 
                <Avatar style={{ width: "120px", height: "120px" }} src={avatarImg || "/broken-image.jpg"} />
                <div>
                    <label htmlFor="upload-image">
                        upload image
                    </label>
                    <Input
                        id="upload-image"
                        style={{display:"none"}}
                        accept="image/*"
                        type="file"
                        onChange={handleFileUpload}
                    />
                </div>
            <div style={{ display: "flex", justifyContent: "flex-end", width:"100%" }}>
                {!editable && <Button style={{ color:"white", backgroundColor: "#3f51b5", height: "40px" }} variant="contained" onClick={()=>{setEditable(true)}} >EDIT</Button>}
                {editable && <Button style={{color:"white", backgroundColor: "#3f51b5", height: "40px" }} variant="contained" onClick={()=>{setEditable(false)}}>SAVE</Button>}
            </div>

            <div style={{backgroundColor:"white", border:"1px solid black"}}>
                <TextField id="outlined-basic" label="House no./Street/Area" variant="outlined"  disabled={!editable} />
                <TextField id="outlined-basic" label="Colony/Street/Locality" variant="outlined"  disabled={!editable} />
                <TextField id="outlined-basic" label="City" variant="outlined"  disabled={!editable} />
                <TextField id="outlined-basic" label="State" variant="outlined"  disabled={!editable} />
                <TextField id="outlined-basic" label="Country" variant="outlined"  disabled={!editable} />
                <TextField id="outlined-basic" label="Pincode" variant="outlined" type="number"  disabled={!editable} />
            </div>
            

            </div>
        </div>
   </div> );
}
 
export default Index;