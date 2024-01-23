import express from 'express';
const router = express.Router();
import {
    addBooking,
    getTicketById,
    getAllTicket,
    cancelTicket, } 
    from '../controllers/bookingController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(addBooking);
router.route('/:id').get(getTicketById);
router.post('/mine').get(getAllTicket);
router.route('/').post(cancelTicket);


export default router;