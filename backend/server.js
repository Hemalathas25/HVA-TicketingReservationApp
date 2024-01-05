import express  from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
import buses from "./data/buses.js";
const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/buses', (req, res) => {
    res.json(buses);
});

app.get('/api/buses/:id', (req, res) => {
    const bus = buses.find((b) => b._id === req.params.id);
    res.json(bus);
});

app.listen(port, () => console.log(`Server running on port ${port}`));