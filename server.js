import bodyParser from 'body-parser'
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express()
const PORT = process.env.PORT

// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true
}))

// routes
app.use("/api/auth", authRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB()
})