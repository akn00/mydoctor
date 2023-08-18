import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import BubbleChartSharpIcon from '@material-ui/icons/BubbleChartSharp';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  return (
    <div>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} style={{ marginLeft: 10 }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div onClick={toggleDrawer(false)}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton edge="end" color="inherit" aria-label="close" onClick={toggleDrawer(false)} style={{ marginRight: 10 }}>
              <CloseIcon />
            </IconButton>
          </div>
          <List style={{ width: 240 }}>
            <ListItem button style={{ marginTop: 10, marginBottom: 10}}>
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
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;
