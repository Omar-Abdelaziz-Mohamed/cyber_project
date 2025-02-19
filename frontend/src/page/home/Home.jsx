import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Grid, useTheme, InputAdornment } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const Home = () => {
    const theme = useTheme();
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const validateUrl = (value) => {
        const urlPattern = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/.*)?$/;
        return urlPattern.test(value);
    };

    const handleSubmit = () => {
        if (!validateUrl(url)) {
            setError('Please enter a valid URL.');
            return;
        }
        setError('');
        console.log('Scanning URL:', url);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                background: theme.palette.background.default,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={10}
                    sx={{
                        padding: { xs: 4, sm: 6 },
                        borderRadius: 4,
                        background: theme.palette.background.paper,
                    }}
                >
                    <Grid container spacing={4} textAlign="center">
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 'bold',
                                    color: theme.palette.primary.main,
                                    mb: 3,
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                }}
                            >
                                VulnScan
                            </Typography>
                            <Typography
                                variant="h6"
                                component="p"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: 4,
                                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                                    paddingX: { xs: 2, sm: 4 },
                                }}
                            >
                                We offer advanced website scanning solutions, leveraging cutting-edge technologies and intelligent analysis to assess URLs, identify security vulnerabilities, and detect potential risks, ensuring robust protection for your business.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <TextField
                                    variant="outlined"
                                    placeholder="Enter Website URL"
                                    size="medium"
                                    fullWidth
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    error={!!error}
                                    helperText={error}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LanguageIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: 3,
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.primary.main,
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: theme.palette.primary.dark,
                                            },
                                        },
                                    }}
                                    sx={{
                                        maxWidth: { xs: '100%', sm: '400px' },
                                        mb: 2,
                                    }}
                                />
                                <Button
    variant="contained"
    color="primary"
    size="large"
    onClick={handleSubmit}
    sx={{
        padding: '14px 40px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: { xs: '100%', sm: 'auto' },
        borderRadius: '50px',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            transform: 'translateY(-3px)',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
        },
        '&:active': {
            transform: 'scale(0.95)',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
        },
        '&:focus': {
            outline: 'none',
            boxShadow: `0px 0px 12px ${theme.palette.primary.main}`,
        },
    }}
>
    🚀 <span>Scan Website</span>
</Button>

                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default Home;
