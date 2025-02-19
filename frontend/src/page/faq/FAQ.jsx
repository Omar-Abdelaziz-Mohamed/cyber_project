// src/page/faq/FAQ.jsx
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import Header from "../../components/Header";

const FAQ = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <Box>

            <Header title="FAQ" subTitle="Frequently Asked Questions Page" />

            <Stack direction={"column"} gap={2}>






                <Accordion defaultExpanded onChange={handleChange("panel1")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            What is a Vulnerability Scan?
                        </Typography>
                        {/* <Typography sx={{ color: "text.secondary" }}>
                            I am an accordion
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            A vulnerability scan is an automated process that checks your
                            website or application for known vulnerabilities and security
                            weaknesses. It helps identify potential risks before malicious
                            actors can exploit them.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    // @ts-ignore
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>

                            How often should I perform a vulnerability scan?

                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            It's recommended to perform regular scans, especially
                            after any major updates or changes to your website.
                            Additionally, conducting scans at least once a month
                            ensures that newly discovered vulnerabilities are detected promptly.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    // @ts-ignore
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Can I customize the scan settings?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Yes, our platform allows you to customize the scan settings
                            according to your specific needs. You can choose which types
                            of vulnerabilities to check for, set up exclusions, and configure
                            advanced options such as scanning depth and frequency.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    // @ts-ignore
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            Is my data secure during the scan?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Absolutely. We use industry-standard encryption protocols
                            to ensure that all data transmitted during the scan is secure.
                            Your information is protected both during transmission and while
                            stored on our servers.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    // @ts-ignore
                    expanded={expanded === "panel5"}
                    onChange={handleChange("panel5")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5bh-content"
                        id="panel5bh-header"
                    >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                            What happens if vulnerabilities are found?
                        </Typography>
                        {/* <Typography sx={{ color: "text.secondary" }}>
                            I am an accordion
                        </Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            If vulnerabilities are detected, we will provide you with
                            a detailed report outlining each issue, its severity, and
                            steps to remediate it. Our team is also available to assist
                            you in understanding and addressing these vulnerabilities.
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </Stack>
        </Box>
    );
};

export default FAQ;