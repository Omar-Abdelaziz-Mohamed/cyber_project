// src/page/sign-in/SignIn.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import AuthContext from '../../context/AuthContext';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});

const SignIn = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        console.error("AuthContext لم يتم تحميله بشكل صحيح");
        return null;
    }

    const { login, setIsLoggedIn } = authContext;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [generalError, setGeneralError] = React.useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setGeneralError(null); 
            setLoading(true);
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                    username: values.username,
                    password: values.password,
                });
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('isLoggedIn', 'true');

                setIsLoggedIn(true);  
                login(response.data); 

                navigate('/dashboard');

                
            } catch (error) {
                console.error('Login failed:', error.response?.data || error.message);
                if (error.response) {
                    setGeneralError('Network error: Please check your internet connection.');
                    const data = error.response.data;

                    
                    if (Array.isArray(data.username) && data.username.length > 0) {
                        if (data.username[0].includes('does not exist')) {
                            formik.setFieldError('username', 'This username does not exist. Please check your input.');
                        } else {
                            formik.setFieldError('username', data.username[0]);
                        }
                    }

                    if (Array.isArray(data.password) && data.password.length > 0) {
                        if (data.password[0].includes('incorrect')) {
                            formik.setFieldError('password', 'Incorrect password for this username.');
                        } else {
                            formik.setFieldError('password', data.password[0]);
                        }
                    }

                    if (data.detail) {
                        if (data.detail.includes('credentials')) {
                            setGeneralError('Username or password is incorrect.');
                        } else {
                            setGeneralError(data.detail || 'An unexpected error occurred.');
                        }
                    }
                } else {
                    setGeneralError('An unexpected error occurred. Please try again later.');
                }
            }finally {
                setLoading(false); 
            }
        },
    });

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign in
                </Typography>
                {generalError && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {generalError}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        autoComplete="username"
                        autoFocus
                        required
                        variant="outlined"
                    />
                    {/* Password Field */}
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        autoComplete="current-password"
                        required
                        variant="outlined"
                    />
                    {/* Submit Button */}
                    <Button type="submit" fullWidth variant="contained" disabled={loading}>
                        {login ? 'Signing in...' : 'Sign in'}
                    </Button>
                    {/* Sign Up Link */}
                    <Typography textAlign="center">
                        Don't have an account?{' '}
                        <a href="/sign_up" style={{ color: '#1976d2', textDecoration: 'none' }}>
                            Sign up
                        </a>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    );
};

export default SignIn;
