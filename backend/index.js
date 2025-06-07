import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";



dotenv.config();

const __dirname = path.resolve();

//app config
const app = express();
const port = process.env.PORT;


//middleware
app.use(express.json({"limit":"10 mb"}));
app.use(cors());

//db connection
connectDB();


//api endpoints
app.use('/api/food',foodRouter);
app.use('/images',express.static("uploads"));
app.use('/api/order',orderRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})