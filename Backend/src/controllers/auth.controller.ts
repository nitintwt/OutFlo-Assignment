import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import {z} from "zod"
import { Types } from "mongoose";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5 , "Name must be at least 5 characters long")
    .max(30 , "Name must be at most 30 characters long")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .trim()
    .email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(8 , "Password must be at least 8 characters long")
    .max(20 , "Password must be at most 20 characters long")
})

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(8 , "Password must be at least 8 characters long")
    .max(20 , "Password must be at most 20 characters long")
})

const generateAccessAndRefreshToken = async (userId:Types.ObjectId , email:string , name:string)=>{
  const accessToken = jwt.sign(
    {
    id:userId,
    email,
    name
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )

  const refreshToken = jwt.sign(
    {
      id:userId
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
  return {accessToken , refreshToken}
}


const registerUser = async (req: Request, res: Response)=>{
  try {
    const parseResult = registerSchema.safeParse(req.body)

    if (!parseResult.success) {
      return res.status(409).json(
        {message: parseResult.error.issues[0].message }
      )
    }
  
    const {name , email , password}= parseResult.data
  
    const existedUser = await User.findOne({email})
    if(existedUser){
      return res.status(409).json(
        {message: "User with this email already exists"}
      )
    }
  
    const user = await User.create({
      name : name,
      email:email,
      password:password
    })
  
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser){
      return res.status(500).json(
        {message: "Something went wrong while registering user"}
      )
    }
  

    return res.status(201).json(
      new ApiResponse(200, createdUser , "User registered Successfully")
    )
  } catch (error) {
    console.error("Register error" , error)
    return res.status(500).json(
      {message: error.message}
    )
  }
}

const loginUser = async (req: Request, res: Response)=>{
  try {
    const parseResult = loginSchema.safeParse(req.body)

    if (!parseResult.success) {
      return res.status(409).json(
        {message: parseResult.error.issues[0].message }
      )
    }
  
    const {email , password}= parseResult.data
  
    const user = await User.findOne({email})
  
    if (!user){
      return res.status(404).json(
        {message: "User doesn't exist" }
      )
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password)
  
    if (!isPasswordValid){
      return res.status(401).json(
        {message: "Password is incorrect" }
      )
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id , email , user.name)
    await User.findByIdAndUpdate(user._id , {refreshToken:refreshToken})
  
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken ")
  
    const options = {
      httpOnly : true,
      secure: true,
      sameSite:"none",
    }

    return res.
    status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json( new ApiResponse(
      200 ,
      {
        user: loggedInUser
      },
      "User logged in successfully"
    ))
  } catch (error) {
    console.error("Login error" , error)
    return res.status(500).json(
      {message: error.message}
    )
  }
}

const logoutUser= async (req: Request, res: Response)=>{
  const userId = req.body.userDbId
  try {
    await User.findByIdAndUpdate(userId , {$set:{refreshToken:undefined}}, {new:true})

    const options ={
      httpOnly:true,
      secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("RefreshToken", options)
    .clearCookie("userData")
    .json(
      new ApiResponse(200 , "User logged out successfully")
    )
  } catch (error) {
    console.error("Logout error" , error)
    return res.status(500).json(
      {message:error.message}
    )
  }
}

const refreshAccessToken =  async (req: Request, res: Response)=>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if (!incomingRefreshToken){
    return res.status(401).json(
      {message: "Unauthorized request"}
    )
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken , process.env.REFRESH_TOKEN_SECRET)
  
    const user = await User.findById(decodedToken?._id)
  
    if (!user){
      return res.status(401).json(
        {message: "Invalid refresh token"}
      )
    }
  
    if (incomingRefreshToken!== user?.refreshToken){
      return res.status(401).json(
        {message: "Refresh token is expired or used"}
      )
    }
  
    const options ={
      httpOnly:true,
      secure: true,
    }
  
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id , user.name , user.email)
  
    return res.status(200).cookie("accessToken",accessToken , options).cookie("refreshToken" , refreshToken, options).json(new ApiResponse(200 , {accessToken , refreshToken}, "access token refreshed successfully"))
    
  } catch (error) {
    return res.status(500).json(
      {message: error.message}
    )
  }

}

export {registerUser , loginUser , logoutUser , refreshAccessToken}