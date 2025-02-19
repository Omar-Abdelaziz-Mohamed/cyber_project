// src/page/Dashboard.jsx
import React, { useState } from "react";
import { Box, Button, CircularProgress, Stack, Typography, Grid, Card, CardContent } from "@mui/material";
import { Search, CloudDownload, Warning, Error, Info, CheckCircle } from "@mui/icons-material";
import Header from "../../components/Header";
import ResultsTable from "./ResultsTable";
import Charts from "./Charts";

const Dashboard = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResults, setScanResults] = useState([]);

    const startScan = async () => {
        setIsScanning(true);
        setScanResults([]);

        try {
            const response = await fetch("/api/startScan");
            const data = await response.json();
            setScanResults(data.results);
        } catch (error) {
            console.error("Error starting scan", error);
        }

        setIsScanning(false);
    };

    const exportResults = () => {
        // Logic to export results (e.g., download as CSV)
        console.log("Exporting results...");
    };

    return (
        <Box p={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Header title="Dashboard" subTitle="Vulnerability Scanner" />
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={startScan}
                        disabled={isScanning}
                        startIcon={isScanning ? <CircularProgress size={24} color="inherit" /> : <Search />}
                    >
                        {isScanning ? "Scanning..." : "Start Scan"}
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={exportResults}
                        startIcon={<CloudDownload />}
                    >
                        Export Results
                    </Button>
                </Stack>
            </Stack>

            {/* Overview Section */}
            <Grid container spacing={3} mt={3}>
    <Grid item xs={12} md={3}>
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Info color="success" fontSize="large" />
                    <Box>
                        <Typography variant="h6">Critical Severity</Typography>
                        <Typography variant="h4" color="success">0</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    </Grid>

    <Grid item xs={12} md={3}>
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Warning color="error" fontSize="large" />
                    <Box>
                        <Typography variant="h6">High Severity</Typography>
                        <Typography variant="h4" color="error">0</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    </Grid>

    <Grid item xs={12} md={3}>
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Error color="warning" fontSize="large" />
                    <Box>
                        <Typography variant="h6">Medium Severity</Typography>
                        <Typography variant="h4" color="warning">0</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    </Grid>

    <Grid item xs={12} md={3}>
        <Card>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <CheckCircle color="info" fontSize="large" />
                    <Box>
                        <Typography variant="h6">Low Severity</Typography>
                        <Typography variant="h4" color="info">0</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    </Grid>
</Grid>

            {/* Scan Results Section */}
            <Box mt={3}>
                <Typography variant="h6" gutterBottom>Scan Results</Typography>
                <ResultsTable data={scanResults} />
            </Box>

            {/* Analytics Section */}
            <Box mt={3}>
                <Typography variant="h6" gutterBottom>Analysis</Typography>
                <Charts results={scanResults} />
            </Box>

            {/* Security Over Time Section */}
                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>Security Over Time</Typography>
                            <Charts results={scanResults} /> {/* Reuse the Charts component */}
                        </Box>
        </Box>
    );
};

export default Dashboard;
