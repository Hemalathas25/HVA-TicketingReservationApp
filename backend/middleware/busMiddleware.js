import Joi from 'joi';
import Bus from '../models/busModel.js';

const checkBusOwner = async (req, res, next) => {
	try{
		const bus = await Bus.findOne({busNumber: req.body.busNumber});

		if(!bus) {
			res.status(404).json({ message : "Bus not found"});
		} else {
            console.log(bus)
			if (req.user && req.user._id.toString() === bus.user_id.toString()){
				next();
			} else {
				res.status(403).json({ message: "User is not the owner of Bus"})
			}
		}
	} catch (error) {
        res.status(400).json({ message: error.message})
    }
};

const busValidation = (data) => {
	const busSchema = Joi.object({
		busNumber: Joi.string().required(),
		seats: Joi.number().required(),
		busType: Joi.boolean(),
        amenities: Joi.string().required(),
	});
	return busSchema.validate(data)
}

const checkSeatsNumber = async (req,res,next) => {
	const { busNumber, availableSeats } = req.body;
	const bus = await Bus.findOne({busNumber})

	if(bus.seats < availableSeats){
		return res.status(404).json({
			message: `Available Seats is not Equal to ${bus.seats}`
		})
	}
	next();
}

export { checkBusOwner, busValidation, checkSeatsNumber }