import mongoose from "mongoose"


const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed", "Cancelled"], default: "Pending" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    negotiate: {type: Array, default: []}
}, { timestamps: true })
const Deal = mongoose.model("Deal", dealSchema)
export default Deal