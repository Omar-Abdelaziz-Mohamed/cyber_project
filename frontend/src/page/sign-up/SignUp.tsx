// src/page/sign-up/SignUp.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FacebookIcon, GoogleIcon } from '../../components/CustomIcons';
import { Checkbox, Link } from '@mui/material';

// Define the server error type
interface ServerError {
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
    non_field_errors?: string[];
}

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
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
}));

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [serverError, setServerError] = React.useState<ServerError>({});

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setServerError({}); // Reset server errors

            try {
                console.log('Sending registration request with:', values); // Log the sent data
                const response = await axios.post('http://127.0.0.1:8000/api/user/register/', values);
                console.log('User registered successfully:', response.data); // Log the response
                navigate('/sign_in');
            } catch (error) {
                console.error('Registration failed:', error.response?.data || error.message); // Log the error

                if (error.response && error.response.data) {
                    setServerError(error.response.data as ServerError);
                }
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="outlined">
                <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                    Sign up
                </Typography>
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
                    {/* Username Field */}
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            (formik.touched.username && Boolean(formik.errors.username)) ||
                            Boolean(serverError.username?.[0])
                        }
                        helperText={
                            formik.touched.username && formik.errors.username
                                ? formik.errors.username
                                : serverError.username?.[0]
                        }
                        autoComplete="username"
                        required
                        variant="outlined"
                    />

                    {/* Email Field */}
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            (formik.touched.email && Boolean(formik.errors.email)) ||
                            Boolean(serverError.email?.[0])
                        }
                        helperText={
                            formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : serverError.email?.[0]
                        }
                        autoComplete="email"
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
                        error={
                            (formik.touched.password && Boolean(formik.errors.password)) ||
                            Boolean(serverError.password?.[0])
                        }
                        helperText={
                            formik.touched.password && formik.errors.password
                                ? formik.errors.password
                                : serverError.password?.[0]
                        }
                        autoComplete="new-password"
                        required
                        variant="outlined"
                    />

                    {/* Confirm Password Field */}
                    <TextField
                        fullWidth
                        id="confirm_password"
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            (formik.touched.confirm_password && Boolean(formik.errors.confirm_password)) ||
                            Boolean(serverError.confirm_password?.[0])
                        }
                        helperText={
                            formik.touched.confirm_password && formik.errors.confirm_password
                                ? formik.errors.confirm_password
                                : serverError.confirm_password?.[0]
                        }
                        autoComplete="new-password"
                        required
                        variant="outlined"
                    />

                    {/* Checkbox for Updates */}
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive updates via email."
                    />

                    {/* Submit Button */}
                    <Button type="submit" fullWidth variant="contained" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign up'}
                    </Button>
                </Box>

                {/* Divider and Social Login */}
                <Divider>
                    <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                        Sign up with Google
                    </Button>
                    <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                        Sign up with Facebook
                    </Button>
                    <Typography textAlign="center">
                        Already have an account?{' '}
                        <Link href="/sign_in" variant="body2">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
    );
};

export default SignUp;