import Ticket from "../models/tickbookModel.js";
import Journey from "../models/journeyModel.js";

const findJourney = async (journey_id) => {
    const journey = await Journey.findById(journey_id);
    return journey;
};

const createTicket = async (
  user_id,
  trip_id,
  busNumber,
  bookingDate,
  passengers,
  numberOfSeats,
  date,
  departureTime,
  arrivalTime,
  boardingPoint,
  droppingPoint,
  totalPrice
) => {
    const newTicket = await Ticket.create({
        user_id,
        trip_id,
        busNumber,
        bookingDate,
        passengers,
        numberOfSeats,
        date,
        departureTime,
        arrivalTime,
        boardingPoint,
        droppingPoint,
        totalPrice,
      });
      return newTicket;
    };

    const checkSeats = async (journey_id, seatNumbers) => {
        const SeatsBooked = await Journey.findOne({ _id: journey_id, bookedSeats: { $in: seatNumbers } });
    
        return SeatsBooked
    }
    
    const UpdateJourneyPush = async (journey_id, numberOfSeats, seatNumbers) => {
        const updatedJourney = await Journey.findOneAndUpdate(
            { _id: journey_id },
            { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: seatNumbers } },
            { new: true }
          );
          return updatedJourney
    }

    const findTicket = async (id) => {
        const ticket = await Ticket.findById(id);
        return ticket
      }
      
      const getTickets = async (id) => {
        const tickets = await Ticket.find({ user_id: id });
        return tickets
      }
      
      const cancel = async (id) => {
        const ticket = await Ticket.findById(id);
        return ticket
      }
      
      const UpdateJourneyyPull = async (journey_id, numberOfSeats, seatNo) => {
        const journey = await Journey.findOneAndUpdate(
          { _id: journey_id },
          { $inc: { availableSeats: numberOfSeats }, $pull: { bookedSeats: { $in: seatNo} } },
          { new: true }
        );
        return journey
      }

      export {
        findJourney,
        createTicket,
        checkSeats,
        UpdateJourneyPush, 
        findTicket,
        getTickets, 
        cancel, 
        UpdateJourneyyPull
     };
