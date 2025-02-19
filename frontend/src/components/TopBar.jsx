// src/commponents/TopBar.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import {
    alpha,
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Stack,
    styled,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

import {
    DarkModeOutlined,
    LightModeOutlined,
    NotificationsOutlined,
    Person2Outlined,
    SettingsOutlined,
} from "@mui/icons-material";
import AuthContext from "../context/AuthContext";

const drawerWidth = 240;

const pages = [
    { text: "Home", path: "/" },
    { text: "Platform", path: "/platform" },
    { text: "Blogs", path: "/blogs" },
];

const settings = [
    { text: "Profile", path: "/profile" },
    { text: "Account", path: "/account" },
    { text: "Dashboard", path: "/dashboard" },
];

const login_logout = [
    { text: "Login", path: "/sign_in" },
    { text: "Sign Up", path: "/sign_up" },
];

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
    
// @ts-ignore
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const TopBar = ({ open, handleDrawerOpen, setMode, handleLogin, handleLogout }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const { isLoggedIn, logout  } = useContext(AuthContext);
    
useEffect(() => {
    setAnchorElUser(null); 
    }, [isLoggedIn]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenUserMenu = (event) => {
        if (!anchorElUser) {
            setAnchorElUser(event.currentTarget);
        }
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed"
            // @ts-ignore
            open={open}>
            <Toolbar>
                {isLoggedIn && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {/* Logo */}
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                VulnScan
                </Typography>

                {/* Navigation Links */}
                {isMobile ? (
    <>
        <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {pages.map((page) => (
                <MenuItem key={page.text} onClick={() => navigate(page.path)}>
                    {page.text.charAt(0).toUpperCase() + page.text.slice(1).toLowerCase()}
                </MenuItem>
            ))}
        </Menu>
    </>
) : (
    <Box sx={{ display: "flex", gap: 2 }}>
        {pages.map((page) => (
            <Button key={page.text} color="inherit" onClick={() => navigate(page.path)}>
                {page.text.charAt(0).toUpperCase() + page.text.slice(1).toLowerCase()}
            </Button>
        ))}
    </Box>
)}

                <Box flexGrow={1} />

                {/* Search Icon */}
                <Stack direction="row" spacing={2} alignItems="center">
                    {isLoggedIn && (
                        <Search sx={{ mr: 2 }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
                        </Search>
                    )}

                    {/* Mode Toggle */}
                    <IconButton
                        onClick={() => {
                            localStorage.setItem("mode", theme.palette.mode === "dark" ? "light" : "dark");
                            setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
                        }}
                        color="inherit"
                    >
                        {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
                    </IconButton>

                    {/* Notification Icon */}
                    {isLoggedIn && (
                        <IconButton color="inherit">
                            <NotificationsOutlined />
                        </IconButton>
                    )}

                    {/* User Menu */}
                    {isLoggedIn && (
                        <Tooltip title="Open settings">
                            <IconButton color="inherit" onClick={handleOpenUserMenu}>
                                <Person2Outlined />
                            </IconButton>
                        </Tooltip>
                    )}
                    {isLoggedIn && (
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.text}
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        navigate(setting.path);
                                    }}
                                >
                                    <Typography textAlign="center">{setting.text}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => {
                                logout();
                                navigate("/");
                            }}>
                                <Typography textAlign="center" color="red">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    )}

                    {/* Login/Signup Buttons */}
                    {!isLoggedIn && (
                        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                            {login_logout.map((item) => (
                                <Button
                                    key={item.text}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: "bold",
                                        color: "white",
                                        display: "block",
                                        transition: "0.3s",
                                        bgcolor: "red",
                                        "&:hover": {
                                            backgroundColor: "darkred",
                                        },
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
