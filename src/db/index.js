import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log(`\n MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
        console.log(`\n DB Name: `, uri)
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;
