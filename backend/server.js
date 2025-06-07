import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config();

//app config
const app = express();
const port = process.env.PORT;


//middleware
app.use(express.json({"limit":"10 mb"}));
app.use(cors());

//db connection
connectDB();

// Serve static files from the admin's dist folder
app.use(express.static(path.join(__dirname, '../admin/dist')));

//api endpoints
app.use('/api/food',foodRouter);
app.use('/images',express.static("uploads"));
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)





// Fallback: serve index.html for any route not handled by API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/dist', 'index.html'));
});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})