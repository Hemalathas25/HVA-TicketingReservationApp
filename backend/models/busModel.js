import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

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
    seats: {
        type: Number,
        required: true,
    },
    boardingpoint: {
        type: String,
        required: true,
    },
    droppingpoint: {
        type: String,
        required: true,
    },
    /*image: {
        type: String,
        required: true,
    },*/
    amenities: {
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
    
    /*timing: {
        type: Number,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },*/
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