import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    busName: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    bookedSeats: [{
        type: Number,
    }],
    boardingPoint: {
        type: String,
        required: true
    },
    droppingPoint: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip