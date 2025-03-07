import express from "express";
import userRoutes from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(express.json()); // Parse JSON request bodies

// Use routers
app.use(cookieParser());

app.use('/api/users', userRoutes);
// app.use('/api/queue', queueRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
