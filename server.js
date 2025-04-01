import bodyParser from 'body-parser'
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
import dealRouter from './routes/dealRouter.js';
import messageRoutes from './routes/messageRoutes.js';
dotenv.config()

const app = express()
const PORT = process.env.PORT

// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

// routes
app.use("/api/auth", authRouter)
app.use("/api/deal", dealRouter)
app.use("/api/message", messageRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB()
})