import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    dealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reciverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    read: { type: Boolean, default: false },
    typing: { type: Boolean, default: false }
}, { timestamps: true })
const Message = mongoose.model("Message", messageSchema);
export default Message