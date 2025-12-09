// Sidebar.jsx (ajout d'animation avec GSAP)
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { gsap } from 'gsap';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      gsap.to('.sidebar-content', { opacity: 1, x: 0, duration: 0.5 });
    } else {
      gsap.to('.sidebar-content', { opacity: 0, x: -250, duration: 0.5 });
    }
  }, [open]);

  return (
    <div>
      <IconButton onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleSidebar}>
        <div className="sidebar-content" style={{ opacity: 0, transform: 'translateX(-250px)' }}>
          <List>
            <ListItem button>
              <Link to="/admin-settings">
                <ListItemText primary="Settings" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/order-history">
                <ListItemText primary="Order History" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/menu">
                <ListItemText primary="Menu" />
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
