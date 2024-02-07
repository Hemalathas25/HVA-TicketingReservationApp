import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const busValidation = (data) => {
	const busSchema = Joi.object({
		busNumber: Joi.string().required(),
		seats: Joi.number().required(),
		busType: Joi.boolean(),
        amenities: Joi.string().required(),
	});
	return busSchema.validate(data)
}

const journeyValidation = (req, res, next) => {
    const schema = Joi.object({
        busNumber : Joi.string().required(),
        availableSeats : Joi.number().required(),
        date : Joi.date().required(),
        boardingPoint : Joi.string().required(),
        droppingPoint : Joi.string().required(),
        departureTime : Joi.date().format('HH:mm').required(),
        arrivalTime : Joi.date().format('HH:mm').required(),
        price : Joi.number().integer().required()
    });
    const { error, value } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}

const searchValidation = (req, res, next) => {
    const schema = Joi.object({
        from : Joi.string().required(),
        to : Joi.string().required(),
        date : Joi.date().required()
    });
    const { error, value } = schema.validate (req.query);
    if(error){
        return res.status(400).json({
            message : error.message
        })
    } else {
        next();
    }
}

const ticketValidation = (req, res, next) => {
    const schema = Joi.object({
        passengers: Joi.array().items(
           Joi.object({
             name: Joi.string().required(),
             gender: Joi.string().required(),
             age: Joi.number().required(),
             seatNo: Joi.number().required(),
           })
        ).required(),
    });
    const { error, value } = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}

export {
    busValidation,
    journeyValidation,
    searchValidation,
    ticketValidation
}