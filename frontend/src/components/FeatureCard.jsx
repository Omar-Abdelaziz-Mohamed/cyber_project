// src/components/FeatureCard.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const FeatureCard = ({ title, description }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: (theme) => theme.palette.background.paper,
            }}
        >
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {description}
            </Typography>
        </Paper>
    );
};

export default FeatureCard;