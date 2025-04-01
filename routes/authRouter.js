import express from 'express'
import { login, logout, register } from '../controller/authController.js'
import {protuct, roleMiddleware} from '../middleware/protuct.js'
const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout", logout)

export default authRouter