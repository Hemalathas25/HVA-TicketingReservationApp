import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUserByID 
} 
    from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';


router.post('/auth', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/').get(protect, admin, getUserByID);


export default router;