import "./SideBar.css"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import BubbleChartSharpIcon from '@material-ui/icons/BubbleChartSharp';
import { useNavigate } from "react-router-dom";
const Index = () => {
    const navigate= useNavigate();
    function ClickSpeciality(){
        navigate("/specialities")
    }
    function clickDoctor(){
        navigate("/")
    }


    return (
        <div className="sidebar">
            <List style={{ width: 240, borderRight: "1 grey solid", }}>
                <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={clickDoctor}>
                    <ListItemIcon><PersonSharpIcon /></ListItemIcon>
                    <ListItemText primary="Doctors" />
                </ListItem>
                <ListItem button style={{ marginTop: 10, marginBottom: 10 }} onClick={ClickSpeciality}>
                    <ListItemIcon>
                        <BubbleChartSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Specialities" />
                </ListItem>

            </List>
        </div>
    );
}

export default Index;