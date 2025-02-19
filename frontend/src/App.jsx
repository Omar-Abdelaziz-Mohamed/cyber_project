// src/App.jsx
import * as React from 'react';
import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router-dom';
import { getDesignTokens } from './theme';
import AuthContext, { AuthProvider } from './context/AuthContext';
import { useContext, useEffect } from 'react';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('isLoggedIn') === 'true');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('access_token'); 
    localStorage.removeItem('refresh_token');
  };

  const [mode, setMode] = React.useState(
    Boolean(localStorage.getItem('mode')) ? localStorage.getItem('mode') : 'light'
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
          const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
          setIsLoggedIn(storedIsLoggedIn);
  
          const handleStorageChange = () => {
              const updatedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
              setIsLoggedIn(updatedIsLoggedIn);
          };
  
          window.addEventListener('storage', handleStorageChange);
  
          return () => {
              window.removeEventListener('storage', handleStorageChange);
          };
      }, [isLoggedIn]);
  
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TopBar
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            setMode={setMode}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
          />
          {isLoggedIn && (
    <SideBar 
        open={open} 
        handleDrawerClose={handleDrawerClose} 
    />
)}
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet />
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}
