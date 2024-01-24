import asyncHandler from '../middleware/asyncHandler.js';
import Bus from '../models/busModel.js';

// @desc   Fetch all buses
// @route  GET / api/buses
// @access public
const getBuses = asyncHandler(async (req, res) => {
    const buses = await Bus.find({});
    res.json(buses);
});


// @desc   Fetch a buses
// @route  GET / api/trip/:id
// @access public
const getTripById = asyncHandler(async (req, res) => {
    const bus = await Bus.findById(req.params.id);

    if(bus){
       return res.json(bus);
    }else {
    res.status(404);
    throw new Error('Resource not found');
    }
});

export { getBuses, getTripById };