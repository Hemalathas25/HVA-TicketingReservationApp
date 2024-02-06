import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Bus routes

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    // Read the JWT from the cookie 
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error)
          res.status(401);
          throw new Error('Not authorized, token');
            
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token failed');
    }
});

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
};

// Get User
const checkUser = async(req,res,next) => {
    const user_id = userId(req)
    const id = req.params.id
    console.log(user_id, id)
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'User Not Found'
            })
        }
        if(id === user_id){
            next();
        } else {
            return res.status(404).json({
                message: "User ID Not Found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid User ID'
        })
    }
};

// Get user Id
const userId = (req) => {
    const token = req.cookies.jwt;

    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.userId;
    } catch (error) {
        console.log('Error verifying JWT:', error);
        return null;
    }
};

export { protect, admin, userId, checkUser };