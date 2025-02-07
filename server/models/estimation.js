const mongoose=require("mongoose")

const EstimateSchema=new mongoose.Schema({
    location:{
        type: String,
        required: true
    },
    treatment:{
        type: String,
        required: true
    },
    schemesToApply:{
        type: [String],
        default:[]
    },
    hospitalType:{
        type: String,
        enum:["Government","Private"],
        required: true
    },
    hospitalName:{
        type: String,
    },
    estimatedcost:{
        type: Number,
    },
},{
    timestamps: true
})

const Estimate=mongoose.model("Estimate",EstimateSchema)
module.exports=Estimate