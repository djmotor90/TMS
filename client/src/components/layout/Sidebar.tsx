import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  LocalShipping,
  Assignment,
  Assessment,
  Settings,
  People,
  Business,
} from '@mui/icons-material';

interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  roles?: string[];
}

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    text: 'Shipments',
    path: '/shipments',
    icon: <Assignment />,
  },
  {
    text: 'Fleet Management',
    path: '/fleet',
    icon: <LocalShipping />,
  },
  {
    text: 'Reports',
    path: '/reports',
    icon: <Assessment />,
  },
  {
    text: 'Settings',
    path: '/settings',
    icon: <Settings />,
    roles: ['admin', 'manager'],
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;