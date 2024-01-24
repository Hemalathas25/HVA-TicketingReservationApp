import Trip from '../models/tripModel.js';

const addTrip = async (
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
) => {
    const newTrip = await Trip.create ({
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
    });

    return newTrip
}

export { addTrip }