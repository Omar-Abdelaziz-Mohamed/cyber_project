//src/page/contacts/Contacts.jsx
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns, rows } from "./data";
import Header from "../../components/Header";


const Contacts = () => {
    return (
        <Box>
            <Header
                title="CONTACTS"
                subTitle="List of Contacts for Future Reference"
            />
            <Box sx={{ height: 600, width: '98%', mx: "auto", }}>
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    rows={rows}
                    // @ts-ignore
                    columns={columns} />
            </Box>
        </Box>
    );
};
export default Contacts;