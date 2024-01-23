import express from 'express';
const router = express.Router();
import { getBuses,getTripById } from '../controllers/busController.js';

router.route('/').get(getBuses);
router.route('/:id').get(getTripById);
export default router;