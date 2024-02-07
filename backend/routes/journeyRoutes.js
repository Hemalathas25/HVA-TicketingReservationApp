import express  from "express";
import { protect} from '../middleware/authMiddleware.js';
import { checkBusOwner, checkJourneySeatNo } from '../middleware/busMiddleware.js';
import { searchValidation, journeyValidation } from "../middleware/validationMiddleware.js";
import { createJourney, getJourneyById, searchBus } from '../controllers/journeyController.js';

const router = express.Router();

router.post('/journey',
protect,
journeyValidation,
checkBusOwner,
checkJourneySeatNo,
createJourney
)

//router.post('/journey', protect, journeyValidation, checkBusOwner, checkJourneySeatNo, createJourney)

router.get('/search', searchValidation, searchBus)

router.get('/:id', getJourneyById)

export default router