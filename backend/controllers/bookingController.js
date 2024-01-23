import asyncHandler from '../middleware/asyncHandler.js';
import Booking from '../models/bookingModel.js';

// @desc   create new booking
// @route  POST/ api/buses
// @access private
const addBooking = asyncHandler(async (req, res) => {
    res.send('add booking');5
});

// @desc   Get ticket by ID
// @route  GET/ api/booking/:id
// @access private
const getTicketById = asyncHandler(async (req, res) => {
    res.send('get ticket by id');
});

// @desc   Get all ticket 
// @route  GET/ api/booking
// @access private
const getAllTicket = asyncHandler(async (req, res) => {
    res.send('get all ticket');
});

// @desc   cancel ticket 
// @route  GET/ api/booking
// @access private
const cancelTicket = asyncHandler(async (req, res) => {
    res.send('cancel ticket');
});

export {
    addBooking,
    getTicketById,
    getAllTicket,
    cancelTicket,
};