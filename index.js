import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import conn from './connection/conn.js' // run the connection string

dotenv.config(); // Load .env variables
conn();

import authRoutes from './routes/userRoute.js' // user routes
import videoRoutes from './routes/videoRoute.js' // videos routes
import commentRoutes from './routes/commentRoute.js' // comments routes
const app = express();
const PORT = process.env.PORT || 5000;

// use cors for connect backend with frontend easily
app.use(cors({
    origin: 'http://localhost:5173', // frontend app's running url
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes); // set default route for user(signup/login/logout/)
app.use('/api', videoRoutes) // set default route for video
app.use('/commentApi', commentRoutes) // set default route for comment

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT} ` )
})


