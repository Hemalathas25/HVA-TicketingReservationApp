import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    bookingItems: [
        {
            name: { type: String, required: true},
            qty: { type: Number, required: true},
            image: { type: String, required: true},
            price: { type: Number, required: true},
            bus: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Bus",
            },
        }
    ],
 
paymentMethod: {
    type: String,
    required: true,
},
paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
},
ticketPrice: {
    type: Number,
    required: true,
    default: 0.0,
},
shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
},
totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
},
isPaid: {
    type: Boolean,
    required: true,
    default: false,
},
paidAt: {
    type: Date,
},
}, {
    timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;