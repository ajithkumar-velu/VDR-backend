import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../models/user.js";
const protuct = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        
        if (!token) return res.status(400).json({ message: "No token, authorization denied"})
            
        const decoded = jwt.verify(token, process.env.JWT_SECRECT)
        const user = await User.findById(decoded.userId).select("-password")

        req.user = user
        next() 
        
    } catch (error) {
        console.log("Error in protuct: ", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}
const roleMiddleware = (roles) =>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)) return res.status(403).json({ message: "access denied"})
        next()
    }
}

export {protuct, roleMiddleware}