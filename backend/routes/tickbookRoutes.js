import express from 'express';
import { 
    bookJourney,
    getAllTickets,
    getTicketById,
    cancelTicket
} from '../controllers/tickbookController.js';

import { protect } from '../middleware/authMiddleware.js';
import { ticketValidation } from '../middleware/validationMiddleware.js';
//import { checkJourneySeatNo, check } from '../middleware/busMiddleware.js';}

const router = express.Router();

router.post('/ticket', protect, ticketValidation, bookJourney)
router.get('/', protect, getAllTickets)
router.route('/:id').get(protect, getTicketById)
router.route('/:id').put(protect,cancelTicket)

export default router