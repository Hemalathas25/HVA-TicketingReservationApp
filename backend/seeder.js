import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import user from "./data/user.js";
import buses from "./data/buses.js";
import User from "./models/userModel.js";
import Bus from "./models/busModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Bus.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(user);
        const adminUser = createdUser[0]._id;

        const sampleBuses = buses.map((bus) => {
            return { ...bus, user: adminUser};
        });

        await Bus.insertMany(sampleBuses);
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Bus.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d'){
    destroyData();
}else {
    importData();
}