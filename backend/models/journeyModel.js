import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
 
    busNumber: {
        type: String,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: [{type: Number}],
    date: {
        type: Date,
        required: true
    },
    boardingPoint: {
        type: String,
        required: true,
    },
    droppingPoint: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },  
    price: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

const Journey = mongoose.model("Journey", journeySchema);

export default Journey;