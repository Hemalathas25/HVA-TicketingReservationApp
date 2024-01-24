import express  from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import busRoutes from "./routes/busRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/buses', busRoutes);
app.use('/api/users', userRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/trip',tripRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));