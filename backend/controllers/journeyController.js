import { addJourney, searchJourney, getJourney, checkJourney } from '../service/journeyService.js';

const createJourney = async (req,res) => {
const {
    busNumber,
    availableSeats,
    date,
    boardingPoint,
    droppingPoint,
    departureTime,
    arrivalTime,
    price
}  = req.body

    try {
        const existingJourney = await checkJourney(busNumber, date)
        if(existingJourney){
            return res.status(400).json({message: "Journey already exists"})
        }
        const journey = await addJourney(
            busNumber,
            availableSeats,
            date,
            boardingPoint,
            droppingPoint,
            departureTime,
            arrivalTime,
            price
        ) 
		return res.status(200).json({
            busNumber: journey.busNumber,
            availableSeats: journey.availableSeats,
            date: journey.date,
            boardingPoint: journey.boardingPoint,
            droppingPoint: journey.droppingPoint,
            departureTime: journey.departureTime,
            arrivalTime: journey.arrivalTime,
            price: journey.price
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        }) 
    }
}

    const getJourneyById = async (req, res) => {
        try {
            const journey = await getJourney(req.params.id)
            
            if (journey) {
                res.status(200).json(journey)
            } else {
                res.status(404).json({ 
                    message: 'Journey not found'
                });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                message : "Invalid Journey ID"
            });
        }
    };

    const searchJourney = async (req,res) => {
        let boardingPoint = req.query.from;
        let droppingPoint = req.query.to;
        let date = req.query.date;
    
        const journey = await searchJourney(boardingPoint, droppingPoint, date)
       
        if (!journey.length) {
            return res.status(404).json({ message: "No available buses" });
        } else {
            return res.status(200).json(journey)
        }
    }

    export { createJourney, getJourneyById, searchJourney }