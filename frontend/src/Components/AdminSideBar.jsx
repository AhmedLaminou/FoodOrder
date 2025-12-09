import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useTheme,
  Tooltip
} from '@mui/material';
import {
  MdDashboard,
  MdExpandLess,
  MdExpandMore,
  MdRestaurantMenu,
  MdAnalytics
} from 'react-icons/md';
import {
  FaUsers,
  FaBox,
  FaHistory,
  FaCog,
  FaChair,
  FaCalendarCheck,
  FaComments,
  FaTags,
  FaChartLine
} from 'react-icons/fa';

/*------------------------- CSS Files -------------------------------*/
import "../static/admin.css";


const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const AdminSideBar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { path: '/admin', icon: <MdDashboard />, label: 'Dashboard' },
    { path: '/admin/analytics', icon: <MdAnalytics />, label: 'Analytics' },
    { path: '/admin/orders', icon: <FaBox />, label: 'Orders' },
    { path: '/admin/order-history', icon: <FaHistory />, label: 'Order History' },
    { path: '/admin/addresses', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/menu', icon: <MdRestaurantMenu />, label: 'Menu Management' },
    { path: '/admin/all-reservations', icon: <FaCalendarCheck />, label: 'Reservations' },
    { path: ' /tables', icon: <FaChair />, label: 'Tables' },
    { path: '/admin/reviews', icon: <FaComments />, label: 'Reviews' },
    { path: '/admin/reports', icon: <FaChartLine />, label: 'Reports' },
    { path: '/admin/tags', icon: <FaTags />, label: 'Tags' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : theme.spacing(9),
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : theme.spacing(9),
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
          overflowX: 'hidden',
        },
      }}
    >
      <DrawerHeader>
        {open && (
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            FastLunch Admin
          </Typography>
        )}
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <MdExpandLess /> : <MdExpandMore />}
        </IconButton>
      </DrawerHeader>

      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={!open ? item.label : ''} placement="right">
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRadius: '8px',
                  mx: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main + '20',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '30',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open ? 1 : 0,
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSideBar;
