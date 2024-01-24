import Joi from 'joi';

const tripValidation = async (req, res, next) => {
    const schema = Joi.object({
        busName : Joi.string().required(),
        destination : Joi.string().required(),
        date : Joi.date().required(),
        availableSeats : Joi.number().required(),
        bookedSeats : Joi.number().required(),
        boardingPoint : Joi.string().required(),
        droppingPoint : Joi.string().required(),
        departureTime : Joi.string().required(),
        arrivalTime : Joi.string().required(), 
        price : Joi.number().integer().required(),
    });

    const { error, value } = await schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    }else {
        next();
    }
}

export { tripValidation }