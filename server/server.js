require("dotenv").config();
const express = require("express");
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
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
connectToDb();
app.use("/price-comparator", priceComparatorRoutes);

app.listen(2424, () => {
  console.log("Server is running on http://localhost:2424");
});
