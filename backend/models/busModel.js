import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    busNumber: {
        type: String,
        required: true,
        unique: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    busType: {
        type: Boolean,
        default: false,
    },
    amenities: {
        type: String,
        required: true,
    }, 
    
},{
    timestamps: true,
});

const Bus = mongoose.model("Bus",busSchema);

export default Bus;