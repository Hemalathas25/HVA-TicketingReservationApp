import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    name: {
        type: String,
        required: true,
    },
    bustype: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    amenities: {
        type: String,
        required: true,
    },
    boardinganddroppingpoint: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: String,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    Seats: {
        type: Number,
        required: true,
    },
    timing: {
        type: Number,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
},
{
    timestamps: true,
});

const Bus = mongoose.model("Bus",busSchema);

export default Bus;