import React from "react"
import "./Home.css"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import BubbleChartSharpIcon from '@material-ui/icons/BubbleChartSharp';
import homeBanner from "../../../assets/mainPageBanner.svg"

const Index = () => {
    return ( <div className="home">
        <div className="sidebar">
        <List style={{ width: 240, borderRight: "1 grey solid", }}>
            <ListItem button style={{ marginTop: 10, marginBottom: 10}} selected>
              <ListItemIcon><PersonSharpIcon /></ListItemIcon>
              <ListItemText primary="Doctors" />
            </ListItem>
            <ListItem button style={{ marginTop: 10, marginBottom: 10}}>
              <ListItemIcon>
              <BubbleChartSharpIcon />
              </ListItemIcon>
              <ListItemText primary="Specialities" />
            </ListItem>

          </List>
        </div>
        <div className="homeContent">
            <img src={homeBanner} alt="Home page Banner" />
        </div>
    </div> );
}
 
export default Index;