// src/page/ResultsTable.jsx
import React from "react";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Chip, Paper } from "@mui/material";

const ResultsTable = ({ data }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "High":
                return "error";
            case "Medium":
                return "warning";
            case "Low":
                return "success";
            default:
                return "default";
        }
    };

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Typography variant="body1">Displaying {data.length} results</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Vulnerability</TableCell>
                            <TableCell>Severity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.vulnerability}</TableCell>
                                <TableCell>
                                    <Chip label={item.severity} color={getSeverityColor(item.severity)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};

export default ResultsTable;
