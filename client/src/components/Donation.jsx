import { useState, useEffect, useCallback} from 'react'; 
import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useNavigation } from 'react-router-dom';


// Sample card data

const Donation = () => {
    
    const navigate = useNavigate();
    
    const handlePayClick = useCallback((id) => {
        navigate(`/payment/${id}`); // Pass the ID in the route if needed
    }, [navigate]);

    //Fetching slider data from the backend
    const [sliderData, setSliderData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_LINK}/api/slider`); // Fetch from backend
                const data = await response.json();
                setSliderData(data);
            } catch (error) {
                console.error('Error fetching slider data:', error);
            }
        };
        fetchData();
    }, []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 cards at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 1024, // Adjust for medium screens (tablet)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600, // Adjust for small screens (mobile)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <Box sx={{ backgroundColor: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)'}}>
            {/* Main Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'end',
                    width: '50%',
                    padding: '0 20px',
                    margin: 'auto',
                    height: '50vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" component="h1" gutterBottom>
                    Great Futures are built with a small donation
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati tempora nulla sunt corporis exercitationem? Vel earum suscipit amet, reprehenderit eius dolore a ea.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1,
                        marginTop: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            fontSize: '0.8rem',
                        }}
                    >
                        Donate Now
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'lightgray',
                            color: 'black',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            fontSize: '0.8rem',
                        }}
                    >
                        Watch Video
                    </Button>
                </Box>
            </Box>

            {/* Horizontal Cards Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    gap: 1,
                    padding: 3,
                    width: '100%',
                    overflowX: 'auto',
                }}
            >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: '15%',
                            height: [1, 6].includes(item) ? '350px' : [2, 5].includes(item) ? '300px' : '250px',
                            background: `url('https://static.vecteezy.com/system/resources/previews/051/824/879/non_2x/cozy-cafe-with-candles-on-a-wooden-table-snow-is-falling-outside-the-window-and-lights-are-shining-around-christmas-winter-evening-vertical-picture-stories-photo.jpg') center/cover`,
                            color: 'white',
                            position: 'relative',
                            borderRadius: 2,
                            overflow: 'hidden',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <CardContent
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                padding: 2,
                            }}
                        >
                            <Typography variant="h6" component="h2">
                                ad {item}
                            </Typography>
                        </CardContent>
                        <Box
                            sx={{
                                position: 'relative',
                                zIndex: 2,
                                paddingBottom: 2,
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(10px)',
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Learn More
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                zIndex: 1,
                            }}
                        />
                    </Card>
                ))}
            </Box>

            {/* Slider Section Below Cards */}
            <Box sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Explore Our Projects
                </Typography>
                <Slider {...settings}
                style={{
                    // padding: '0 15px',
                    margin: '0 10px' // Ensure there's padding for the slider container
                  }}>
                    {sliderData.map((card, index) => (
                        <Box
                            key={index}
                            sx={{
                                // display: 'flex',
                                // flexDirection: 'column',
                                // background: '#fff',
                                // boxShadow: 3,
                                // borderRadius: 2,
                                overflow: 'hidden',
                                padding: 2,
                                // border: '1px solid #e0e0e0', // Light border for the card
                                // margin: '0 px', // Gap between the cards
                            }}
                        >
                            <Box
                                sx={{
                                    height: '50%',
                                    display: 'flex',
                                    justifyContent: 'center', // Center the image
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    style={{
                                        width: '30%', // Adjust the image size
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '8px', // Optional: Make image corners rounded
                                    }}
                                />
                            </Box>
                            <Typography variant="h5" component="h2" sx={{ marginTop: 2 }}>
                                {card.title}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 2 , width: '100%', height: '30px'}}>
                                {card.description}
                            </Typography>
                            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                Total Donation: {card.donation}
                            </Typography>
                            <Button onClick={() => handlePayClick(card.id)}
                                variant="contained"
                                color="primary"
                                sx={{
                                    alignSelf: 'center',
                                    width: '50%',
                                }}
                            >
                                Donate Now
                            </Button>
                        </Box>
                    ))}
                </Slider>
            </Box>
            </Box>
        </>
    );
};

export default Donation;
