import express from 'express';
import { 
    bookJourney
} from '../controllers/tickbookController.js';

import { protect } from '../middleware/authMiddleware.js';
import { ticketValidation } from '../middleware/validationMiddleware.js';
//import { checkJourneySeatNo, check } from '../middleware/busMiddleware.js';}

const router = express.Router();

router.post('/ticket', protect, ticketValidation, bookJourney)

export default router