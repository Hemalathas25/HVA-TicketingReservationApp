import Journey from "../models/journeyModel.js";

const addJourney = async (
    busNumber,
    availableSeats,
    date,
    boardingPoint,
    droppingPoint,
    departureTime,
    arrivalTime,
    price
    ) => {
const newJourney = await Journey.create({
    busNumber,
    availableSeats,
    date,
    boardingPoint,
    droppingPoint,
    departureTime,
    arrivalTime,
    price
});
    return newJourney
}

const searchJourney = async(boardingPoint, droppingPoint, date) => {
    const journeyy = await Journey.find({
        boardingPoint: { $regex: boardingPoint, $options: 'i'},
        droppingPoint: { $regex: droppingPoint, $options: 'i'},
        date: date,
    });
    return journeyy;
}

const checkJourney = async (busNumber, date) => {
    const existingJourney = await Journey.findOne({
        busNumber: busNumber,
        date: date,
    });
    return existingJourney
}

const getJourney = async (journey_Id) => {
    const journey = await Journey.findById( journey_Id);
    return journey
}

export {
    addJourney, searchJourney, checkJourney, getJourney
}