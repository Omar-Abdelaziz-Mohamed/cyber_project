// src/page/platform/Platform.jsx
import React, { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Container, Divider, Paper } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";

// بيانات الفوائد
const useBenefits = () => useMemo(() => ([
    { title: "Vulnerability Detection", description: "Identifies potential vulnerabilities in websites through their URLs." },
    { title: "Real-Time Alerts", description: "Notifies users immediately if vulnerabilities are detected, allowing for prompt remediation." },
    { title: "Comprehensive Analysis", description: "Performs in-depth scans to uncover hidden security issues across different website layers." },
    { title: "Proactive Security", description: "Enables businesses to take proactive steps to secure their online presence before attackers exploit vulnerabilities." },
    { title: "Regulatory Compliance", description: "Helps ensure compliance with security standards and regulations, such as GDPR and HIPAA." },
    { title: "Advanced Threat Intelligence", description: "Integrates with threat intelligence feeds to provide up-to-date information about emerging security risks." },
    { title: "Risk Assessment", description: "Assesses the potential impact of identified vulnerabilities, guiding users on the severity and risk level." }
    
]), []);

const BenefitItem = ({ title, description, isLast }) => {
    const theme = useTheme();
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot color="primary" />
                {!isLast && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, backgroundColor: theme.palette.background.paper }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    );
};

const Platform = () => {
    const theme = useTheme();
    const benefits = useBenefits();

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: "100vh" }}>
            <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                    About our VulnScan Monitoring Platform
                </Typography>
                <Typography variant="body1" align="center" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
                    Our platform provides comprehensive VulnScan monitoring solutions to safeguard businesses, leveraging advanced technologies and intelligence-driven approaches.
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
                    Key Benefits of VulnScan Platform:
                </Typography>


                <Timeline position="alternate">
                    {benefits.map((benefit, index) => (
                        <BenefitItem key={index} {...benefit} isLast={index === benefits.length - 1} />
                    ))}
                </Timeline>
            </Container>
        </Box>
    );
};

export default Platform;
