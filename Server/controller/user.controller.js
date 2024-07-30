import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register= async(req,res)=>{
    const {fullname,email,password,phoneNumber,role}=req.body;

    if(!fullname||!email||!password||!phoneNumber||!role)
    {
        return res.status(400).json({
            message:"Something is missing",
            success:false
        })
    }
    const user=await User.findOne({email})
    if(user)
    {
        return res.status(400).json({
            message:"User with this email already exist",
            success:false
        })
    }
    const hashedPassword =await bcryptjs.hash(password,10);
    
    try {
        await User.create({
            fullname,
            email,
            password:hashedPassword,
            phoneNumber,
            role,
        })
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"something went wrong",
            success:false
        })
    }
    
}

export const login=async(req,res)=>{
    const {email,password,role}=req.body;
   try {
    const validUser=await User.findOne({email})
    if(!validUser)
    {
        return res.status(400).json({
            message:"Email or Password is incorrect",
            success:false
        })
    }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword)
        {
            return res.status(400).json({
                message:"Email or Password is incorrect",
                success:false
            })
        }
        if(role!=validUser.role)
        {
            return res.status(400).json({
                message:"User not exist for this role",
                success:false
            })
        }
        
        const tokenData = {
            userId: validUser._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const { password: pass, ...rest } = validUser._doc;
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${validUser.fullname}`,
            rest,
            success: true
        })

    

   } catch (error) {
    console.log(error)
   }
    
}