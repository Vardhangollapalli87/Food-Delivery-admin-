import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async () =>{
    try{

        await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("MongoDB Connected..."));

    }
    catch(e){
        console.error(e.message);
    }
}

