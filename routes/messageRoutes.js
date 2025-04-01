import express from 'express'
import { getAllMessages, myDealMessages, myDealNegotiates, sendMessage } from '../controller/messageContoller.js'
import { protuct } from '../middleware/protuct.js'
const messageRoutes = express.Router()

messageRoutes.post("/", protuct, sendMessage)
messageRoutes.get("/getAll/:dealId", protuct, getAllMessages)
messageRoutes.get("/myDealNegotiates/:dealId", protuct, myDealNegotiates)
messageRoutes.post("/myDealMessages", protuct, myDealMessages)

export default messageRoutes