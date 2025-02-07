const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    id: {//this is the id of the react slider need to update it manually
        type: Number,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    donation: {
        type: Number,
        required: true,
        min: [0, 'Donation amount cannot be negative'],
    },
});

module.exports = mongoose.model("Donation", donationSchema);
