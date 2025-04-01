import express from 'express'
import { protuct } from '../middleware/protuct.js'
import {addNegotiate, createDeal, getDeal, getMyDeals, getNegotiate} from '../controller/dealController.js'
const dealRouter = express.Router()

dealRouter.post('/create', protuct, createDeal)
dealRouter.get('/get', protuct, getDeal)
dealRouter.get('/getMyDeals', protuct, getMyDeals)
dealRouter.get('/getNegotiate/:dealId', protuct, getNegotiate)
dealRouter.post('/addNegotiate', protuct, addNegotiate)

export default dealRouter