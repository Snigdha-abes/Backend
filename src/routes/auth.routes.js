const express=require("express")
const router=express.Router()
const UserModel=require('../models/user.model')
const jwt=require("jsonwebtoken")

router.post('/register',async(req,res)=>{
     const{username,password}=req.body
     const user=await UserModel.create({
        username,password
     })
     const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    res.cookie("token",token)
     res.status(200).json({
        message:"User Registered Successfully",
        user,
        token
     })
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const isUserExists=await UserModel.findOne({
        username:username
    })
    if(!isUserExists){
        return res.status(401).json({
            message:"user not found"
        })
    }
    const isPasswordValid= password==user.password
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    res.status(200).json({
        message:"User logged in Successfully"
    })
})
router.get('/user',async(req,res)=>{
    //req.body me hum token nahi bhejte cookie me bhejte hai
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    const user=await UserModel.findOne({
        _id:decoded.id
    }).select("-password")//this method removes the detail that you dont want server to send to frontend for e.g. in this case we don't want password
    res.status(200).json({
        message:"user data fetched successfully",
        user
    })
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
})
module.exports=router