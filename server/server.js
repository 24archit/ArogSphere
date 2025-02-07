require("dotenv").config();
const Razorpay = require('razorpay')
const crypto = require('crypto')
const express = require("express");
const Donation = require("./models/Donation");
const app = express();
const compression = require("compression");
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_LINK || "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const { connectToDb } = require("./utils/connectToDb");
const priceComparatorRoutes = require("./routes/priceComparator");
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
connectToDb();
app.use("/price-comparator", priceComparatorRoutes);



app.post('/order', async (req, res) => {
  try {
      const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET
      })
      const options = {
          amount: req.body.amount * 100, // amount in smallest currency unit
          currency: "INR",
          receipt: "ArogSphere",
      };
      const order = await razorpay.orders.create(options)

      if (!order) {
          return res.status(500).send("Some error occured")
      }
      res.json(order);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }

})

app.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;

      // Generate the expected signature using your secret key
      const expectedSignature = crypto
          .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
          .update(body)
          .digest('hex');

      // Compare the expected signature with the received signature
      if (expectedSignature === razorpay_signature) {
          // If valid, respond with success
          return res.status(200).json({ success: true, message: 'Payment verified successfully!' });
      } else {
          // If invalid, respond with error
          return res.status(400).json({ success: false, message: 'Payment verification failed!' });
      }
  } catch (error) {
      console.error('Verification error:', error);
      res.status(400).json({ success: false, message: 'Payment verification failed! in try catch' });
  }
});

//Mongodb connection
app.get('/api/slider', async (req, res) => {
  try {
    const sliderData = await Donation.find(); // Fetch all slider data from the database
    res.status(200).json(sliderData);
  } catch (error) {
    console.error('Error fetching slider data:', error);
    res.status(500).json({ message: 'Failed to fetch slider data' });
  }
});

app.get('/api/donation/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the route parameter
  try {
      const donation = await Donation.findOne({id: id}); // Find the document by ID
      if (!donation) {
          return res.status(404).json({ message: 'Donation not found' });
      }
      res.status(200).json(donation);
  } catch (error) {
      console.error('Error fetching donation details:', error);
      res.status(500).json({ message: 'Failed to fetch donation details' });
  }
});

//updating amount

app.post('/update-donation', async (req, res) => {
  const { id, amount } = req.body; // Expecting payment ID and amount from the frontend

  try {
      // Find the donation by ID and update the total amount
      const donate = await Donation.findOne({id: id}); // Assuming `id` is the unique identifier
      if (!donate) {
          return res.status(404).json({ message: 'Donation not found' });
      }

      donate.donation += Number(amount); // Increment the amount
      await donate.save();

      res.status(200).json({ success: true, donate });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to update donation' });
  }
});

app.post('/api/slider', async (req, res) => {
  try {
      const sliderData = await Donation.create(req.body);
      res.status(201).json(sliderData);
  } catch (error) {
      console.error('Error creating slider data:', error);
      res.status(500).json({ message: 'Failed to create slider data' });
  }
});


app.listen(2424, () => {
  console.log("Server is running on http://localhost:2424");
});
