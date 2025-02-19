{/* ==================================open-seting icon============================== */}
                    {/* <Tooltip title="Open settings">
                        <IconButton color="inherit" onClick={handleOpenUserMenu}>
                            <SettingsOutlined />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu> */}
{/* ==================================end open-seting============================== */}

{/* ==================================links page phone============================== */}
                {/* <Box sx={{
                    flexGrow: 1, display: { xs: 'none', md: 'flex' },
                    justifyContent: "center", // توسيط العناصر أفقياً
                    gap: 2
                }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.text} onClick={() => {
                                handleCloseNavMenu();
                                navigate(page.path);
                            }}>
                                <Typography sx={{ textAlign: 'center' }}>{page.text}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box> */}

                {/* ==================================end links page phone============================== */}
                // const validationSchema = Yup.object({
                //     name: Yup.string().required('Name is required'),
                //     email: Yup.string().email('Invalid email address').required('Email is required'),
                //     password: Yup.string()
                //         .min(6, 'Password must be at least 6 characters long')
                //         .required('Password is required'),
                //     confirm_password: Yup.string()
                //         .oneOf([Yup.ref('password'), null], 'Passwords must match')
                //         .required('Confirm Password is required'),
                // });
                
                // const SignUp = () => {
                //     const navigate = useNavigate();
                
                //     const formik = useFormik({
                //         initialValues: {
                //             name: '',
                //             email: '',
                //             password: '',
                //             confirm_password: '', // إضافة حقل confirm_password
                //         },
                //         validationSchema,
                //         onSubmit: async (values) => {
                //             try {
                //                 const response = await axios.post('http://127.0.0.1:8000/api/user/register/', values);
                //                 console.log('User registered successfully:', response.data);
                //                 navigate('/sign_in');
                //             } catch (error) {
                //                 if (error.response && error.response.data) {
                //                     console.error('Registration failed:', error.response.data);
                //                     alert(`Registration failed: ${JSON.stringify(error.response.data)}`);
                //                 } else {
                //                     console.error('An unexpected error occurred:', error.message);
                //                     alert('An unexpected error occurred. Please try again later.');
                //                 }
                //             }
                //         },
                //     });
                
                //     return (
                //         <SignUpContainer direction="column" justifyContent="space-between">
                //             {/* ... */}
                //             <TextField
                //                 fullWidth
                //                 id="confirm_password"
                //                 name="confirm_password"
                //                 label="Confirm Password"
                //                 type="password"
                //                 value={formik.values.confirm_password}
                //                 onChange={formik.handleChange}
                //                 error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                //                 helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                //                 autoComplete="new-password"
                //                 required
                //                 variant="outlined"
                //             />
                //             {/* ... */}
                //         </SignUpContainer>
                //     );
                // };



                import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function ProtectedRoute() {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn === null) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/sign_in" />;
}

export default ProtectedRoute;

