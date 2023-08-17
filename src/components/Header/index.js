import logo from "../../assets/logo.svg"
import "./Header.css"
import { Button, InputBase, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Header = () => {
    return ( 
    <div className="header">
        <div className="logo">
            <img src={logo} alt="logo"/>
        </div>
        <div className="searchBar">
        <select id="specialtyInput"  defaultValue="">
            <option value="" disabled default>Select a service</option>
            <option value="Bone Marrow">Bone Marrow</option>
            <option value="Anesthisiology">  Anesthisiology</option>
            <option value="E.N.T">  E.N.T</option>
            <option value="Cardiac Surgery">Cardiac Surgery</option>
            <option value="Cosmetology">Cosmetology</option>
            <option value="Clinical Nutrition & Dietetics">Clinical Nutrition & Dietetics</option>
            <option value="Breast & Oncoplastic - Oncology">Breast & Oncoplastic - Oncology</option>
            <option value="Child & Adolescent Psychiatry">Child & Adolescent Psychiatry</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Audiology">Audiology</option>
            <option value="Cranio-Maxillo Facial Surgery">Cranio-Maxillo Facial Surgery</option>
            <option value="Clinical Psychology">Clinical Psychology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Critical Care Medicine">Critical Care Medicine</option>
            <option value="Dental">Dental</option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Diabetology">Diabetology</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Endocrinology & Diabetology">Endocrinology & Diabetology</option>
            <option value="Development Behavioral Pediatrics">Development Behavioral Pediatrics</option>
                </select>
       
            
                <div className="search">
                    <InputBase
                        placeholder="Search Doctors"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>



        </div>

        <div className="buttonLogin">
        <Button variant="contained" color="primary">Login</Button>
        </div>
    </div> 
    );
}
 
export default Header;