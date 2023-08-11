import logo from "../../assets/logo.svg"
import "./Header.css"
import {Button} from '@material-ui/core'; 
const Header = () => {
    return ( 
    <div className="header">
        <div className="logo">
            <img src={logo} alt="logo"/>
        </div>
        <div className="searchBar">

        </div>

        <div className="buttonLogin">
        <Button variant="contained" color="primary">Login</Button>
        </div>
    </div> 
    );
}
 
export default Header;