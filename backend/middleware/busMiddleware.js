import Bus from '../models/busModel.js';
import Journey from '../models/journeyModel.js';

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


const checkJourneySeatNo = async (req,res,next) => {
	const { busNumber, availableSeats } = req.body;
	const bus = await Bus.findOne({busNumber})

	if(bus.seats < availableSeats){
		return res.status(404).json({
			message: `Available Seats is not Equal to ${bus.seats}`
		})
	}
	next();
}

const sameSeatNo = (req,res,next) => {
	const { passengers } = req.body;
	const seats = passengers.map((passenger) => passenger.seatNo) 
	const isSame = new Set(seats).size !== seats.length
	if (isSame){
		return res.status(401).json({
			message: "Seat not available,Select different Seats"
		})
	}
	next();
}

const checkAvailableSeatNos = async (req,res,next) => {
	try{
	const { passengers } = req.body
	const id = req.params.trip_id
	const trip = await Journey.findById(id)
	if(!journey){
		return res.status(404).json({
			message: 'journey Not Found'
		})
	}
	const num = journey.busNumber
	const bus = await Bus.findOne({busNumber: num})
	if(!bus){
		return res.status(404).json({
			message: 'Bus Not Found'
		})
	}
	const seatss = passengers.map((p) => p.seatNo)
	const check = seatss.map((seat) => bus.seats < seat)
	if(check.includes(true)){
		return res.status(404).json({
			message: 'Seats Not Found'
		})
	}
	
	next();
	} catch(error){
		res.status(500).json({
			message: "Invalid Journey Id"
		})
	}
}



export
 { checkBusOwner,
   checkJourneySeatNo,
   sameSeatNo,
   checkAvailableSeatNos
    }