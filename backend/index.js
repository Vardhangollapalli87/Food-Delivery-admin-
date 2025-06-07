import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json({ "limit": "10mb" }));
app.use(cors());

// db connection
connectDB();

// api endpoints
console.log("Registering /api/food");
app.use('/api/food', foodRouter);

console.log("Registering /images");
app.use('/images', express.static("uploads"));

console.log("Registering /api/order");
app.use('/api/order', orderRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});