import { User } from "../models/user.model.js"
import { Campaign } from "../models/campaign.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const allCampaigns = async ( req , res)=>{
  const {userId} = req.query
  try {
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const campaigns = await Campaign.find({creator:userId})
    return res.status(200).json(
      new ApiResponse(200 , campaigns , "All campaigns fetched successfully")
    )
  } catch (error) {
    console.error("Something went wrong while fetching all campaigns" , error)
    return res.status(500).json(
      {message: "Something went wrong while fetching all campaigns. Try again."}
    )
  }
}

const createCampaign = async (req , res)=>{
  const {userId , name , description , accountIds }= req.body

  try {
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"Invalid request. User not found"})
    }

    const campaign = await Campaign.create({
      creator:userId,
      name:name,
      description:description,
      accountIds:accountIds
    })

    return res.status(200).json(
      new ApiResponse(200 , campaign , "Campaign created successfully")
    )
  } catch (error) {
    console.error("Something went wrong while creating campaign" , error)
    return res.status(500).json(
      {message: "Something went wrong while creating campaign. Try again."}
    )
  }
}

const fetchCampaign = async(req , res)=>{
  const {id}= req.params
  const {userId}= req.query
  try {
    const campaign = await Campaign.findOne({ _id: id, creator: userId });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found or unauthorized" });
    }

    return res.status(200).json(
      new ApiResponse(200 , campaign , "Campaign fetched successfully")
    )
  } catch (error) {
    console.error("Something went wrong while fetching campaign" , error)
    return res.status(500).json(
      {message: "Something went wrong while fetching campaign. Try again."}
    )
  }
}

const toggleStatus = async ( req , res)=>{
  const {id}= req.params
  const {userId} = req.query
  try {
    const campaign = await Campaign.findOne({ _id: id, creator: userId });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found or unauthorized" });
    }
    
    const newStatus = campaign.status === "active" ? "inactive" : "active"
    campaign.status = newStatus
    await campaign.save()

    return res.status(200).json(
      new ApiResponse(200 , campaign , "Campaign status changed successfully")
    )
  } catch (error) {
    console.error("Something went wrong while toggling status of campaign" , error)
    return res.status(500).json(
      {message: "Something went wrong while toggling status of campaign. Try again."}
    )
  }
}

const deleteCampaign = async ( req , res)=>{
  const {id}= req.params
  const {userId} = req.query
  try {
    const campaign = await Campaign.findOneAndUpdate({_id:id , creator:userId}, {status:"deleted"}, {new:true})
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found or unauthorized" });
    }

    return res.status(200).json(
      new ApiResponse(200 , campaign , "Campaign deleted successfully")
    )
  } catch (error) {
    console.error("Something went wrong while deleting campaign" , error)
    return res.status(500).json(
      {message: "Something went wrong while deleting campaign. Try again."}
    )
  }
}

export {allCampaigns , createCampaign , fetchCampaign , toggleStatus , deleteCampaign}