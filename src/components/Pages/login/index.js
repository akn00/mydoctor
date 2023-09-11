import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./login.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Index = () => {

    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [strategy,setStrategy] = useState("local");
    const [errorLogingIn,setErrorLogingIn]=useState(false);
    const navigate =useNavigate();
    

    async function loginClick(){
        let data={email,password}
        // console.log(typeof(email*1))
        if (!isNaN(+email)){
            setStrategy("local-mobile")
            data={contactNumber:email,password}
        }
        else{
            setStrategy("local")
            data={email,password}
        }
        let result = await fetch("http://my-doctors.net:8090/authentication",{
            method:"POST",
            headers:{
                'Accept':"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify({...data,strategy:strategy}),
                
            
        })
        result = await result.json();
        // console.log("userInfo",JSON.stringify(result))
        if(result.message==='Invalid login'){
            setErrorLogingIn(true);
        }
        // console.log(JSON.stringify(result.message));
        else{
            setErrorLogingIn(false);
            localStorage.setItem("userInfo",JSON.stringify(result));
            navigate("/");
        }
    }

    return ( 
    <div className="loginPage">
    {errorLogingIn && 
        <div className="errorMessageLogin">
            <div>
                <InfoOutlinedIcon style={{display: "flex",
                                        alignItems:"flex-start",
                                        opacity: "0.9",
                                        padding: "7px 0",
                                        fontSize: "22px",
                                        marginRight: "12px",
                                        color:"#f44336"}}/>
            </div>
            <div className="errorMessage">
                Mobile Number/Email or password is incorrect. Please try again.
            </div>
        </div>}
    <div className="textFieldInput">
    <TextField id="outlined-basic" label="Email or Mobile Number" required variant="outlined" margin="normal" value={email} onChange={(e)=>(setemail(e.target.value))}/>
    <TextField id="outlined-basic" type="password" label="Password" required variant="outlined" margin="normal" value={password} onChange={(e)=>(setPassword(e.target.value))}/>
    </div>
    <div className="forgotPassword">
    <Button variant="contained" color="primary" onClick={loginClick}>Login</Button>
    <a href="/">Forgot password?</a>
    </div>

    <p>Don't have an account? <a href="/">Sign up</a></p>
    </div>
    );
}
 
export default Index;