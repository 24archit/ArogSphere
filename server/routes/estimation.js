const express = require("express")
const mongoose = require("mongoose");
const Estimate = require("../models/estimation");
const router = express.Router()


// to create a estimation 
router.post("/createEstimation", async (req, res) => {
    try {
        const { location, treatment, schemesToApply, hospitalType, estimatedcost, hospitalName } = req.body;
        if (!location || !treatment || !hospitalType) {
            return res.status(422).json({ success: false, error: "Please fill all the fields" })
        }
        const estimate = await Estimate.create({
            location, treatment, schemesToApply, hospitalType, estimatedcost, hospitalName
        })
        return res.status(200).json({ success: true, estimate: estimate })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Some error has been occured" })
    }
})

//fetch the required details through input
router.get("/fetchEstimation", async (req, res) => {
    try {
        const { location, treatment, hospitalType } = req.query;
        if (!location || !treatment || !hospitalType) {
            return res.status(422).json({ success: false, error: "Please fill all the fields" })
        }
        const estimate = await Estimate.find({ location, treatment, hospitalType })
        if (estimate) {

            return res.status(200).json({ success: true, estimate: estimate })
        }
        else {
            return res.status(404).json({ success: false, message: "No data found" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Some error has been occured" })
    }
})

//fetch all the locations
router.get("/fetchLocations",async(req,res)=>{
    try {
        const locations=await Estimate.distinct("location")
        if(locations){
            return res.status(200).json({success:true,locations:locations})
        }
        else{
            return res.status(404).json({success:false,message:"No data found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Some error has been occured"})

    }
})

// fetch all the treatments
router.get("/fetchTreatments",async(req,res)=>{
    try {
        const {location}=req.query;
        const treatments=await Estimate.distinct("treatment",{location})
        if (treatments){
            return res.status(200).json({success:true,treatments:treatments})
        }
        else{
            return res.status(404).json({success:false,message:"No data found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some error has been occured"})   
    }
})

module.exports = router;