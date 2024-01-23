import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    logoutUser } 
    from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';


router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
//router.route('/').get(getUserByID);


export default router;