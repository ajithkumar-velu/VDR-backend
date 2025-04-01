import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const register = async (req, res)=>{
    try {
        const { fullname, email, password, role } = req.body
        
        const exists = await User.findOne({email})
        if(exists) return res.status(400).json({ message: "User already exists"})
        
        if(password.length < 8) return res.status(400).json({ message: "Password must 8 characters"}) 
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            password: hashedPassword,
            email,
            role
        })
        await newUser.save()
        return res.status(201).json({ message: "Registered sucessfully"})
        
    } catch (error) {
        console.log("Error in register: ", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}
const login = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        
        if(password.length < 8) return res.status(400).json({ message: "Password must 8 character"})
        if(!user) return res.status(400).json({ message: "Invalid credentals"})
            console.log("check");
        
        const veryfiy = await bcrypt.compare(password, user.password)
        if(!veryfiy) return res.status(400).json({ message: "Invalid credentals"})

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRECT, { expiresIn: "2d"})
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        return res.status(200).json({ _id: user._id, fullname: user.fullname, email: user.email, role: user.role, message: "Login successfully"})
        
        
    } catch (error) {
        console.log("Error in login: ", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}
const logout = async (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge: 0})
        return res.status(200).json({ message: "Login successfully"})
    } catch (error) {
        console.log("Error in logout: ", error);
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export { register, login, logout}