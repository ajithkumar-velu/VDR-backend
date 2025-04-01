import Deal from "../models/Deal.js"
import Message from "../models/Message.js"
import User from "../models/user.js"

const sendMessage = async (req, res) => {
    try {
        let check = false
        let senderId = req.body.senderId;
        if (!senderId){
            check = true
            senderId = req.user._id
        }
        
        const { text, dealId } = req.body
        const deal = await Deal.findById(dealId)
        console.log(deal);
        let reciverId
        if (deal.buyer) {
            reciverId = deal.buyer
        } else {
            reciverId = deal.seller
        }
        console.log(text, senderId, reciverId);
        if(check){
            let temp= senderId
            senderId = reciverId
            reciverId = temp
        }
        const newMessage = new Message({
            dealId,
            senderId,
            text,
            reciverId
        })
        
        console.log(newMessage);
        await newMessage.save()
        return res.status(201).json(newMessage)


        return res.send(deal)


        // console.log(senderId, reciverId, text, dealId);

        if (!text) return res.status(400).json({ message: 'Please enter a message' })

        const deals = await Deal.find({ negotiate: senderId });


        // if (deals.length === 0) {
        //     await Deal.findByIdAndUpdate(
        //         dealId,
        //         { $addToSet: { negotiate: senderId } },
        //         { new: true }
        //     )
        // }

    } catch (error) {
        console.log("Error in send message: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAllMessages = async (req, res) => {
    try {
        const senderId = req.user._id
        const { dealId } = req.params
        // console.log(senderId, req.params);
        
        const deal = await Deal.findById(dealId)
        // console.log(deal);
        let reciverId
        if (deal.buyer) {
            reciverId = deal.buyer
        } else {
            reciverId = deal.seller
        }
        // console.log(senderId, reciverId, dealId);
        // return res.send("")
        
        const messages = await Message.find({
            $and: [{ dealId: dealId }, {
                $or: [
                    { senderId: senderId, reciverId: reciverId },
                    { senderId: reciverId, reciverId: senderId }]
            }]
        })
        //  console.log(messages);
        
        return res.status(200).json(messages)
    } catch (error) {
        console.log("Error in get all message: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// get negotiates contact for my deal
export const myDealNegotiates = async(req, res)=>{
    try {
        const senderId = req.user._id
        const { dealId } = req.params
        const val = await Deal.findById(dealId)

        const negotiates = await User.find({
            _id: {$in: val.negotiate}
        }).select("-password")

        // console.log(senderId, dealId, val.negotiate, negotiates);
        
        return res.status(200).json(negotiates)
        
    } catch (error) {
        console.log("Error in my Deal Negotiates: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const myDealMessages = async(req, res)=>{
    try {
        const {senderId, dealId} = req.body
        const reciverId = req.user._id

        const messages = await Message.find({
            $and: [{ dealId: dealId}, {
                $or: [{senderId: senderId, reciverId: reciverId}, {senderId: reciverId, reciverId: senderId}]
            }]
        })
        // console.log(messages);
        
        res.status(200).json(messages);
        
        return
    } catch (error) {
        console.log("Error in My deal Messages: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { sendMessage, getAllMessages }