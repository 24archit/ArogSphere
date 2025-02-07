const mongoose=require("mongoose");
const Mongo_Uri=process.env.MONGO_URI || "mongodb://localhost:27017/agrosphere";

const connectToMongoDB=async()=>{
    return(
        await mongoose.connect(`${Mongo_Uri}`).then(()=>{
            console.log("Mongodb is connected Successfully")
        }).catch(()=>{
            console.log("MongoDb is not Connected")
        })
    )
}

module.exports={connectToMongoDB};
