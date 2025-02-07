import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Payment = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDonationDetails = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_LINK}/api/donation/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch donation details');
            }
            const data = await response.json();
            setDonation(data);
        } catch (err) {
            alert(err.message);
        }
    };
    fetchDonationDetails(); 
}, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.amount) newErrors.amount = 'Donation amount is required';
    else if (isNaN(formData.amount) || formData.amount <= 0) newErrors.amount = 'Enter a valid amount';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your connection.');
        return;
      }

      try {
        // Create order from backend
        const response = await fetch(`${import.meta.env.VITE_SERVER_LINK}/order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: formData.amount}),
        });

        const orderData = await response.json();


        if (!response.ok) {
          throw new Error(orderData.message || 'Failed to create an order');
        }

        // Razorpay Checkout options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'Your Organization',
          description: 'Thank you for your donation!',
          order_id: orderData.id,


          handler: async function (response) {          
            try {
              // Send the payment response to the server for verification
              const verificationResponse = await fetch(`${import.meta.env.VITE_SERVER_LINK}/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
          
              const result = await verificationResponse.json();
          
              if (result.success) {

                const updateResponse = await fetch(`${import.meta.env.VITE_SERVER_LINK}/update-donation`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id, amount: formData.amount }), 
              });
  
              const updateResult = await updateResponse.json();

              if (updateResult.success) {
                alert(`Payment verified and database updated successfully!`);
                setFormData({ name: '', email: '', amount: '' }); // Reset form
                //rediect to home page
                navigate('/crowd-sourcing');
            } else {
                alert('Failed to update database. Please contact support.');
            }
              } else {
                alert('Payment verification failed. Please contact support.');
              }
            } catch (error) {
              console.error('Error during verification:', error);
              alert('An error occurred during payment verification. Please try again.');
            }
          },
          
          prefill: {
            name: formData.name,
            email: formData.email,
          },
          theme: {
            color: '#3399cc',
          },
        };

        console.log(options);

        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full viewport height to center vertically
        background: 'linear-gradient(to right, #f7f7f7, #eaeaea)', // Optional gradient background
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          padding: 3,
          background: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Make a Donation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Donation Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Donate
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Payment;
