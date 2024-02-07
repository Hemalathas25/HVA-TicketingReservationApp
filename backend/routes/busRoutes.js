import express from 'express';
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js';
import { createBus } from '../controllers/busController.js';

router.post('/bus', protect, admin, createBus);



export default router;