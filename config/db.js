import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Database connected");
    } catch (error) {
        console.log("Error in connecting db: ", error);
    }
}
export default connectDB