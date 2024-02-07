import {
        findJourney,
        createTicket,
        checkSeats,
        UpdateJourneyPush, 
        findTicket,
        getTickets, 
        cancel, 
        UpdateJourneyyPull
}  from "../service/tickbookService.js";

const bookJourney = async (req, res) => {
    const { passengers} = req.body;
    const { journey_id } = req.params;

    try {
        const journey = await findJourney(journey_id);

        if (!journey) {
            return res.status(404).json({ message: 'Journey not found' });
        }
        const user_id = req.user
        const busNumber = journey.busNumber;
        const bookingDate = new Date;
        const numberOfSeats = passengers.length;
        const date = journey.date;
        const departureTime = journey.departureTime;
        const arrivalTime = journey.arrivalTime;
        const boardingPoint = journey.boardingPoint;
        const droppingPoint = journey.droppingPoint;
        const totalPrice = passengers.length * journey.price;

        const seatNumbers = passengers.map(passenger => passenger.seatNo);

        const seatExists = await checkSeats(trip_id, seatNumbers)

        if (seatExists) {
            return res.status(400).json({ message: 'Seat already booked' });
        }
        
        const ticket = await createTicket(user_id,
                                            journey_id,
                                            busNumber,
                                            bookingDate, 
                                            passengers,
                                            numberOfSeats, 
                                            date, 
                                            departureTime,
                                            arrivalTime,
                                            boardingPoint, 
                                            droppingPoint, 
                                            totalPrice)
        
        const updateJourney = await UpdateJourneyPush(journey_id, numberOfSeats, seatNumbers);
    
        if (!updateJourney) {
            return res.status(500).json({ message: 'Cannot to update journey' });
        }

        res.status(200).json({ 
            user_id : ticket.user_id,
            journey_id : ticket.journey_id,
            busNumber : ticket.busNumber,
            bookingDate : ticket.bookingDate,
            passengers : ticket.passengers,
            numberOfSeats : ticket.numberOfSeats,
            date : ticket.date,
            departureTime : ticket.departureTime,
            arrivalTime : ticket.arrivalTime,
            boardingPoint : ticket.boardingPoint,
            droppingPoint : ticket.droppingPoint,
            totalPrice : ticket.totalPrice
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message : "Invalid Journey ID" })
    } 
}

export { 
    bookJourney
}