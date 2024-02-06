import Bus from '../models/busModel.js';
import { busValidation } from '../middleware/validationMiddleware.js';
import { userId } from '../middleware/authMiddleware.js';

const addBus = async (user_id, busNumber, seats, busType, amenities) => {
    const newBus = await Bus.create({
        user_id, busNumber, seats, busType, amenities
    });
    return newBus
}

const createBus = async (req, res) => {
    try {
        const {
            busNumber, seats, busType, amenities
        } = req.body

        const { error } = busValidation(req.body)
        if(error){
        return res.status(400).json({
           message: error.message
        })}
       const user_id = userId(req)

       const bus = await addBus(user_id, busNumber, seats, busType, amenities)

       res.status(200).json({
        user_id: bus.user_id,
        busNumber: bus.busNumber,
        seats: bus.seats,
        busType: bus.busType,
        amenities: bus.amenities
       })

    } catch (error) {
        res.status(500).json({ message: "Bus Already Exists"})
    }
}




export { createBus, addBus };