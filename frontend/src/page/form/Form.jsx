// src/page/form/Form.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Stack } from '@mui/material';
import { useForm, } from "react-hook-form";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Header from '../../components/Header';

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const data = [
    {
        value: 'Admin',
        label: 'Admin',
    },
    {
        value: 'Manager',
        label: 'Manager',
    },
    {
        value: 'User',
        label: 'User',
    },
];


const Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const onSubmit = () => {
        console.log("data");
        handleClick()
    };
    return (
        <Box>


            <Header title="CREATE USER" subTitle="Create a New User Profile" />
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
                noValidate
                autoComplete="off"
            >
                <Stack sx={{ gap: 2 }} direction={"row"}>

                    <TextField
                        error={Boolean(errors.firstName)}
                        helperText={Boolean(errors.firstName) ? "First Name is required" : null}
                        {...register("firstName", { required: true, minLength: 3 })}
                        sx={{ flex: 1 }} label="First Name" variant="filled" />

                    <TextField
                        error={Boolean(errors.lastName)}
                        helperText={Boolean(errors.lastName) ? "Last Name is required" : null}
                        {...register("lastName", { required: true, minLength: 3 })}
                        sx={{ flex: 1 }} label="Last Name" variant="filled" />
                </Stack>

                <TextField
                    error={Boolean(errors.email)}
                    helperText={Boolean(errors.email) ? "email is required" : null}
                    {...register("email", { required: true, minLength: 3, pattern: regEmail })}
                    label="Email" variant="filled" />


                <TextField
                    error={Boolean(errors.ContactNumber)}
                    helperText={Boolean(errors.ContactNumber) ? "phone is required" : null}
                    {...register("ContactNumber", { required: true, minLength: 3, pattern: phoneRegExp })}
                    label="Contact Number" variant="filled" />

                <TextField label="Address 1" variant="filled" />
                <TextField label="Address 2" variant="filled" />

                <TextField
                    variant="filled"
                    id="outlined-select-currency"
                    select
                    label="Role"
                    defaultValue="User"
                >
                    {data.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Box sx={{ textAlign: 'right' }}>
                    <Button type='submit' sx={{ textTransform: "capitalize" }} variant="contained">
                        Create New User
                    </Button>

                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert

                            onClose={handleClose}
                            severity="info"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            This is a success Alert inside a Snackbar!
                        </Alert>
                    </Snackbar>

                </Box>
            </Box>
        </Box>
    );
};
export default Form;