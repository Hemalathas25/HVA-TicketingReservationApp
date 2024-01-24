import Trip from '../models/tripModel.js';
import { addTrip } from '../service/tripService.js';

const createTrip = async (req,res) => {
    const {
    busName, 
    destination,
    date, 
    availableSeats, 
    bookedSeats,
    boardingPoint, 
    droppingPoint, 
    departureTime, 
    arrivalTime, 
    price
    } = req.body

    try {
        const existingTrip = await Trip.findOne({
            $and: [
                {date: date},
                {departureTime: {$lte: arrivalTime}},
                {arrivalTime: {$gte: departureTime}}
            ]
        });
        if(existingTrip){
            return res.status(400).json({message: "Trip already exists"})
		}
        
        const trip = await addTrip(
            busName, 
            destination,
            date, 
            availableSeats, 
            bookedSeats,
            boardingPoint, 
            droppingPoint, 
            departureTime, 
            arrivalTime, 
            price
        )

        return res.status(200).json({
            busName: trip.busName,
            destination: trip.destination,
            date: trip.date,
            availableSeats: trip.availableSeats,
            bookedSeats: trip.bookedSeats,
            boardingPoint: trip.boardingPoint,
            droppingPoint: trip.droppingPoint,
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            price: trip.price
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export { createTrip }