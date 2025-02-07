const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const {connectToMongoDB}=require("./connection/connectToDb")
require('dotenv').config()
const estimateRoutes=require("./routes/estimation");
const hospitalRoutes=require("./routes/hospital");

const app=express()
app.use(express.json())
app.use(cors())
const port=process.env.PORT
connectToMongoDB();

app.use("/estimate",estimateRoutes);
app.use("/fetchDetailHospital",hospitalRoutes);


app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
