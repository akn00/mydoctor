import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./login.css"

const index = () => {
    return ( 
    <div className="loginPage">
    <div className="textFieldInput">
    <TextField id="outlined-basic" label="Email or Mobile Number *" variant="outlined" margin="normal"/>
    <TextField id="outlined-basic" label="Password *" variant="outlined" margin="normal"/>
    </div>
    <div className="forgotPassword">
    <Button variant="contained" color="primary" >Login</Button>
    <a href="/">Forgot password?</a>
    </div>

    <p>Don't have an account? <a href="/">Sign up</a></p>
    </div>
    );
}
 
export default index;