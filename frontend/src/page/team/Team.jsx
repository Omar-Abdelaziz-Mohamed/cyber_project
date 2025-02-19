import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { rows } from './data';
import { useTheme } from '@mui/material';
import { Box, Typography } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from '../../components/Header';


const Team = () => {
    const theme = useTheme();

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'age',
            headerName: 'Age',
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'access',
            headerName: 'Access',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: ({ row: { access } }) => {
                return (
                    <Box sx={{
                        p: "5px",
                        width: "99px",
                        borderRadius: "3px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "space-evenly",
                        backgroundColor:
                            access === 'admin'
                                ? theme.palette.primary.dark
                                : access === 'manager'
                                    ? theme.palette.secondary.dark
                                    : "#3da58a",
                    }}>
                        {access === 'admin' && <AdminPanelSettingsOutlinedIcon sx={{ color: "#fff" }} fontSize='small' />}
                        {access === 'manager' && <SecurityOutlinedIcon sx={{ color: "#fff" }} fontSize='small' />}
                        {access === 'user' && <LockOpenOutlinedIcon sx={{ color: "#fff" }} fontSize='small' />}
                        <Typography sx={{ fontSize: "13", color: "#fff" }}> {access} </Typography>
                    </Box>
                );
            },
        },
    ];



    return (
        <Box>
        <Header title={"TEAM"} subTitle={"Managing the Team Members"} />

        <Box sx={{ height: 600, width: '98%', mx: "auto", }}>
            <DataGrid rows={rows}
                // @ts-ignore
                columns={columns} />
        </Box>
        </Box>
    );
};
export default Team;