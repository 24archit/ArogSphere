import React, { useState, useRef } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Image1 from "../../assets/media/Image1.png";
import CGHS from "../../assets/media/CGHS.webp";
import MJPJAY from "../../assets/media/MJPJAY.jpg";
import PMJAY from "../../assets/media/PMJAY.jpg";
import PMSBY from "../../assets/media/PMSBY.jpg";
import RSBY from "../../assets/media/RSBY.jpeg";
import AABY from "../../assets/media/AABY.webp";
import ESIC from "../../assets/media/ESIC.jpg";

const healthSchemes = [
  {
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PMJAY)",
    benefits: "Provides health coverage up to ₹5 lakhs per family per year.",
    criteria: "Families listed in the SECC database.",
    coverage: "Covers hospitalization costs, medicines, and follow-up care.",
    premium: "Free for eligible families.",
    additional: "Covers pre-existing diseases from day one.",
    link: "https://pmjay.gov.in",
    image: PMJAY,
  },
  {
    name: "Central Government Health Scheme (CGHS)",
    benefits: "Comprehensive healthcare for central government employees.",
    criteria: "Central government employees and pensioners.",
    coverage: "Covers OPD, hospitalization, medicines, and diagnostics.",
    premium: "Varies based on employee category.",
    additional: "Available in select cities across India.",
    link: "https://cghs.nic.in",
    image: CGHS,
  },
  {
    name: "The Mahatama Jyotiba Phule Jan Arogya Yojana",
    benefits: "Health coverage up to ₹1.5 lakh for families in Maharashtra.",
    criteria: "Families belonging to economically weaker sections.",
    coverage: "Covers hospitalization, surgeries, and critical care.",
    premium: "Fully government-funded.",
    additional: "Covers major diseases and surgeries.",
    link: "https://www.jeevandayee.gov.in",
    image: MJPJAY,
  },
  {
    name: "The Rashtriya Swasthya Bima Yojana (RSBY)",
    benefits:
      "Health insurance for BPL families, covering up to ₹30,000 per year.",
    criteria: "BPL families as per government records.",
    coverage: "Covers hospitalization costs, surgery, maternity care.",
    premium: "Government-funded, no cost to beneficiaries.",
    additional: "Covers up to five family members.",
    link: "https://www.rsby.gov.in",
    image: RSBY,
  },
  {
    name: "The Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    benefits: "Accident insurance cover up to ₹2 lakhs.",
    criteria: "Indian citizens aged 18-70 with a bank account.",
    coverage: "Covers accidental death and disability.",
    premium: "₹20 per year, auto-debited from a bank account.",
    additional: "Covers permanent and partial disabilities.",
    link: "https://jansuraksha.gov.in/Forms-PMSBY.aspx",
    image: PMSBY,
  },
  {
    name: "Aam Aadmi Bima Yojana (AABY)",
    benefits:
      "Provides death and disability coverage to rural landless households.",
    criteria: "Rural landless households aged 18-59.",
    coverage: "₹30,000 for natural death, ₹75,000 for accidental death.",
    premium: "₹200 per annum per person.",
    additional: "Provides scholarships for children.",
    link: "https://financialservices.gov.in/insurance-divisions/aaby",
    image: AABY,
  },
  {
    name: "Employees' State Insurance Scheme (ESIC)",
    benefits: "Provides medical care and cash benefits to employees.",
    criteria: "Employees earning up to ₹21,000 per month.",
    coverage: "Covers sickness, maternity, and disablement benefits.",
    premium: "0.75% of wages (employee) & 3.75% of wages (employer).",
    additional: "Provides dependents' benefits.",
    link: "https://www.esic.gov.in/",
    image: ESIC,
  },
];

const HealthSchemes = () => {
  const [search, setSearch] = useState("");
  const schemeRefs = useRef([]);

  const filteredSchemes = healthSchemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleScroll = (index) => {
    schemeRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container>
      <Typography
        variant="h2"
        fontWeight="bold"
        align="center"
        sx={{ mt: 6, mb: 7 }}
      >
        Government Health Schemes
      </Typography>

      <Grid container spacing={4} alignItems="center" sx={{ marginBottom: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold">
            What is Government Health Schemes?
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            A Government Health Scheme is a State or Central Government powered
            health insurance initiative for its citizens. It is directed towards
            enhancing the healthcare quotient of the region by offering
            low-priced insurance policies with a sizable sum insured. Such
            policies are usually offered on an annual basis.
          </Typography>
        </Grid>

        <Grid item xs={10} md={6}>
          <CardMedia
            component="img"
            height="320"
            image={Image1}
            alt="Healthcare Image"
            sx={{ borderRadius: "10px", boxShadow: 3 }}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <SearchIcon sx={{ marginRight: "10px" }} />
        <TextField
          label="Search Schemes"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
        All Schemes
      </Typography>
      <List
        sx={{
          maxWidth: 600,
          margin: "auto",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        {healthSchemes.map((scheme, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleScroll(index)}>
              <ListItemText primary={scheme.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {filteredSchemes.map((scheme, index) => (
          <Grid
            item
            xs={12}
            key={index}
            ref={(el) => (schemeRefs.current[index] = el)}
          >
            <Card sx={{ width: "100%", boxShadow: 4 }}>
              <CardMedia
                component="img"
                height="400"
                image={scheme.image}
                alt={scheme.name}
                sx={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  objectFit: "contain",
                  maxHeight: "400px",
                }}
              />
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {scheme.name}
                </Typography>
                <Typography variant="h6">
                  <strong>Benefits:</strong> {scheme.benefits}
                </Typography>
                <Typography variant="h6">
                  <strong>Eligibility:</strong> {scheme.criteria}
                </Typography>
                <Typography variant="h6">
                  <strong>Coverage:</strong> {scheme.coverage}
                </Typography>
                <Typography variant="h6">
                  <strong>Premium:</strong> {scheme.premium}
                </Typography>
                <Typography variant="h6">
                  <strong>Additional Info:</strong> {scheme.additional}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  href={scheme.link}
                  target="_blank"
                >
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HealthSchemes;