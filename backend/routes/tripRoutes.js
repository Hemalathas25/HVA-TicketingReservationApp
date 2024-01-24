import express  from "express";
import { protect, admin } from '../middleware/authMiddleware.js';
import { createTrip } from "../controllers/tripController.js";


const router = express.Router();

router.post('/trip', protect, admin, createTrip)

export default router