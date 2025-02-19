// src/page/Charts.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";


const Charts = ({ results }) => {
    // تحقق من أن هناك بيانات
    if (!results || results.length === 0) {
        return (
            <Paper elevation={3}>
                <Box p={2}>
                    <Typography variant="h6" gutterBottom>
                        Analysis Charts
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        No data available to display.
                    </Typography>
                </Box>
            </Paper>
        );
    }

    // حساب عدد العناصر لكل مستوى شدة
    const severityCounts = results.reduce((acc, item) => {
        acc[item.severity] = (acc[item.severity] || 0) + 1;
        return acc;
    }, {});

    // تحويل البيانات إلى تنسيق مناسب للرسم البياني
    const chartData = Object.keys(severityCounts).map((severity) => ({
        id: severity,
        label: severity,
        value: severityCounts[severity],
        color:
            severity === "High"
                ? "#FF4D4F"
                : severity === "Medium"
                    ? "#FFC107"
                    : "#28A745",
    }));

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Typography variant="h6" gutterBottom>
                    Vulnerability Analysis
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Distribution of vulnerabilities by severity level.
                </Typography>
                <Box height={300}>
                    <ResponsivePie
                        data={chartData}
                        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        colors={(d) => d.data.color}
                        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: "color" }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                        tooltip={(tooltip) => (
                            <Paper elevation={3} style={{ padding: "8px", borderRadius: "4px" }}>
                                <Typography variant="body2" color="textPrimary">
                                    {tooltip.data.id}: {tooltip.data.value}
                                </Typography>
                            </Paper>
                        )}
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default Charts;
