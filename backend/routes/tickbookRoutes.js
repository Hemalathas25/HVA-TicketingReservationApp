import express from 'express';
import { 
    bookJourney,
    getAllTickets,
    getTicketById,
    cancelTicket
} from '../controllers/tickbookController.js';

import { protect, checkAuthUser } from '../middleware/authMiddleware.js';
import { ticketValidation } from '../middleware/validationMiddleware.js';
import {sameSeatNo, checkAvailableSeatNos } from "../middleware/busMiddleware.js";
const router = express.Router();

router.post('/ticket/:journey_id', 
protect,
ticketValidation,
bookJourney,
sameSeatNo,
checkAvailableSeatNos)

router.get('/', protect, getAllTickets)
router.route('/:id').get(protect, checkAuthUser, getTicketById)
.put(protect, checkAuthUser, cancelTicket)


export default router