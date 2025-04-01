import Deal from "../models/Deal.js";
import User from "../models/user.js";

const createDeal = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || !price) return res.status(400).json({ message: "Please fill in all fields" });
        if (req.user.role == 'Buyer') {
            const newDeal = new Deal({
                title,
                description,
                price,
                buyer: req.user._id
            })
            await newDeal.save()
            return res.status(200).json({ newDeal, message: "Deal created successfully" })

        } else {
            const newDeal = new Deal({
                title,
                description,
                price,
                seller: req.user._id
            })
            await newDeal.save()
            return res.status(200).json({ newDeal, message: "Deal created successfully" })
        }
    } catch (error) {
        console.log("Error in create Deal: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const getDeal = async (req, res) => {
    try {
        // if (req.user.role === "Buyer") {
        //     const deals = await Deal.find({
        //         seller: { $ne: req.user._id },
        //         buyer: null
        //     })
        //     return res.status(200).json({ deals })
        // } else {
        //     const deals = await Deal.find({
        //         buyer: { $ne: req.user._id },
        //         seller: null
        //     })
        //     return res.status(200).json({ deals })
        // }

        const deals = await Deal.find().sort({ createdAt: -1 })
        return res.status(200).json({ deals })
    } catch (error) {
        console.log("Error in get deals: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const getNegotiate = async (req, res) => {
    try {
        const { dealId } = req.params
        const contacts = await Deal.findById(dealId)
        // console.log(contacts);

        const val = await User.find({
            _id: { $in: contacts.negotiate }
        })
        // console.log(val);

        return res.status(200).json(val)
    } catch (error) {
        console.log("Error in get Negotiate: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
const getMyDeals = async (req, res) => {
    try {
        // console.log(req.user);

        // if (req.user.role === "Buyer"){
        //     return res.json({role:"buyer"})
        // }{
        //     return res.json({role:"seller"})
        // }
        const deals = await Deal.find({
            $or: [
                { buyer: req.user._id },
                { seller: req.user._id }
            ]
        })
        return res.status(200).json({ deals })
    } catch (error) {
        console.log("Error in get deals by id: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

//  add users in deal negotiate and get negotiates
export const addNegotiate = async (req, res) => {
    try {
        const { dealId } = req.body
        // console.log(req.body);

        if (dealId) {
            const val = await Deal.find({
                $and: [{ _id: dealId }, {
                    $or: [
                        { buyer: req.user._id },
                        { seller: req.user._id }]
                }]
            })
            console.log("val", val, req.user._id);
            
            if (val.length !== 0) return res.status(400).json({ message: "you already in deal" })
            const updateDeal = await Deal.findByIdAndUpdate(dealId, { $addToSet: { negotiate: req.user._id } }, { new: true })
            if (!updateDeal) return res.status(404).json({ message: "Deal not found" })
        }

        const deals = await Deal.find({
            negotiate: { $in: [req.user._id] }
        })

        res.status(200).json(deals)
    } catch (error) {
        console.log("Error in addNegotiate: ", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}
// get my negotiate users


export { createDeal, getDeal, getMyDeals, getNegotiate }